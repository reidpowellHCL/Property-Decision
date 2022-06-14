import React, { useEffect } from 'react';
import {
  useHistory,
} from "react-router-dom";
import './mainPage.css';

// Data
import * as XLSX from "xlsx";
import policyData from '../../inputData/policyData.xlsx';

// MUI imports
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import { withTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';

// Components
import AppBar from '../AppBar/AppBar';
import MainPageFooter from './MainPageFooter';





function MainPage(props) {

  const {calculateCumulativeRisk, loadExcelData, loadReferralData, property, referralLoading } = props;


  useEffect(() => {
    if (!property.referralDataIsLoading) {
      referralLoading(true);
    } else {
      referralLoading(false);
    }

    fetch(policyData).then(res => {
      return res.arrayBuffer();
    }).then(res => {
      let wb = XLSX.read(new Uint8Array(res), {
        type: 'array'
      });
      wb.SheetNames.forEach(sheet => {
        let rawObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheet]);
        loadReferralData(rawObj);
      });
    });
  }, []);

  useEffect(() => {
    if (property.referralData.length) {
      referralLoading(false);
    }
  }, [property.referralData]);


  const columnWidth = 249;


  // Data Grid Columns & Rows
  const columns = [
    {
      align: "center",
      headerAlign: "center",
      field: 'submissionId',
      headerName: 'Submission Number',
      width: columnWidth,
      type: 'string'
    },
    {
      align: "center",
      headerAlign: "center",
      field: 'policyId',
      headerName: 'Policy Number',
      width: columnWidth,
      editable: false,
    },
    {
      align: "center",
      headerAlign: "center",
      field: 'effectiveDate',
      headerName: 'Policy Effective Date',
      width: columnWidth,
      editable: false,
      sortable: true,
    },
    {
      align: "center",
      headerAlign: "center",
      field: 'dateReferred',
      headerName: 'Date Referred',
      type: 'number',
      width: columnWidth,
      editable: true,
    },
    {
      align: "center",
      headerAlign: "center",
      field: 'daysPendingReview',
      headerName: 'Days Pending Review',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: columnWidth,
    },
    {
      align: "center",
      headerAlign: "center",
      field: 'status',
      headerName: 'Status',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: columnWidth,
    },
  ];

  const history = useHistory();
  const rows = property.referralData.slice(0, 10);


  return (
    <Grid container className="home" >


      <Grid item xs={12} direction='column' style={{ display: 'flex', height: '20%' }}>

        <AppBar appBar="home-appbar" {...props} />

        <Typography variant="h5" style={{ backgroundColor: '#f2f2f2', fontSize: '25px', height: '200px', padding: '25px 0 0 10px'}}>
          Property Underwriting Decision Support Tool
        </Typography>

      </Grid>

      <Grid item xs={12}  id="datagrid-wrapper">
        <DataGrid
          rows={rows}
          columns={columns}
          columnBuffer
          getCellClassName={(params) => {
            if (params.colDef.headerName === "Submission Number"){
              return "submission-number-cell"
            }
            if (params.colDef.headerName === "Policy Number"){
              return "policy-number-cell"
            }
          }}
          headerAlign="center"
          hideFooter
          loading={property.referralDataIsLoading}
          onCellClick={(event) => {

            if (property.referralData.length) {
              property.referralData.forEach(async policyObject => {
                if (policyObject.submissionId === event.value || policyObject.policyId === event.value) {
                 new Promise(resolve => {
                   resolve(loadExcelData(property.rawObj, policyObject.policyId))
                 }).then(loadExcelResponse => {
                    return new Promise(resolve => {
                      resolve(calculateCumulativeRisk(loadExcelResponse.payload[0]))
                  })}
                  ).then(cumRiskResponse => {
                    if(cumRiskResponse.payload){
                      history.push(`policy-page/${policyObject.policyId}`, {
                        cumulativeRisk: cumRiskResponse.payload,
                        policyNumber: policyObject.policyId
                      })
                    }
                  })
                  
                  
                  
                }
              })
            }
          }}
          pageSize={10}
        />
      </Grid>

      <MainPageFooter />

    </Grid>
  );

};


const themeMainPage = withTheme(MainPage);

export default themeMainPage;
