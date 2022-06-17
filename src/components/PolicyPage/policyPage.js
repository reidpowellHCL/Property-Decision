import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';
import ClientInformation from '../ClientInfo/clientInformation';
import * as XLSX from "xlsx";
import PolicyRiskScore from '../RiskScore/riskScore';
import OtherActivePolicies from '../OtherPolicies/otherPolicies.js';
import PropertyCharacteristics from '../PropertyCharacteristics/propertyCharacteristics';
import RiskFactors from '../RiskFactors/riskFactors';
import UnderwritingComments from '../UnderwritingComments/underwritingComments';
import Footer from '../Footer/footer';
import PolicyLimits from '../PolicyLimits/policyLimits';
import policyData from '../../inputData/policyData.xlsx';
import './policyPage.css'

// MUI Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { withTheme } from '@mui/styles';

// Components
import AppBar from '../AppBar/AppBar';





function PolicyPage(props) {


  const {calculateRiskScore, calculateCumulativeRisk, loadAllCumRiskScores, loadExcelData, loading, match, property, resetButtonState, updatePolicy } = props;

  const [state, setState] = useState({
    backButtonClass: 'active',
    cancelButtonClass: 'active',
    saveButtonClass: 'inactive',
    submitButtonClass: 'inactive',
    policyNumber: '',
    currentPolicy: property.policies[0]
  });

  // React-Router History
  const history = useHistory();

  useEffect(() => {
      loading(true);
    fetch(policyData).then(res => {
      return res.arrayBuffer();
    }).then(res => {
      let wb = XLSX.read(new Uint8Array(res), {
        type: 'array'
      });
      wb.SheetNames.forEach(sheet => {
        let rawObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheet]);
        loadAllCumRiskScores(rawObj);
        
          loadExcelData(rawObj, history.location.state.policyNumber)
      })
    })

    resetButtonState();
  },[])
  
  // Calculate Cumulative Risk after initial data load
  useEffect(() => {
    if (property.policies !== null && property.policies !== undefined && property.policies.length !== 0){
      calculateCumulativeRisk(property.policies[0]);
    }
  },[property.policies[0]]);


  // Calculate Risk Score upon cumulativeRisk change
  useEffect(() => {
      calculateRiskScore(history.location.state.cumulativeRisk ? history.location.state.cumulativeRisk : property.cumulativeRisk, property.maxOfAllCumRiskScores)
  }, [property.maxOfAllCumRiskScores])

  
  // Use React Router useParams hook to capture policy ID
  const { id } = useParams();

  const primary = props.theme.palette.primary.main;

  if (property.loading) {
    return (
      <div className="load-text-home">
        <div className="load-text">
          Loading, Please Wait...
        </div>
      </div>
    );
  }


  return (
    <Grid container xs={12} className="policy">

      <Grid item xs={12} direction='column' style={{ display: 'flex', height: '20%' }}>

        <AppBar appBar="policy-appbar" {...props} />

        <Grid container direction="row" xs={12} style={{ backgroundColor: '#f2f2f2', fontSize: '25px', height: '200px', padding: '25px 0 0 10px' }}>
          <Grid item xs={10}>
            <Typography variant="h5">
              Property Underwriting Decision Support Tool
            </Typography>
          </Grid>

          <Grid item xs={2} className='policy-page-policy-number-wrapper'>
            <Typography>
              Policy Number: {id}
            </Typography>
          </Grid>


        </Grid>


      </Grid>

      <Grid item className="container" direction='column' wrap>
        <Grid container direction="row" className="clientInformation-container">
          <PolicyRiskScore property={property} primary={primary} state={state} setState={setState} {...props} />
          <ClientInformation {...props} property={property} updatePolicy={updatePolicy} />
          <OtherActivePolicies property={property} primary={primary} />
        </Grid>
        <div className="policy-limits-container">
          <PolicyLimits property={property} updatePolicy={updatePolicy} />
        </div>
        <div className="property-characteristics-container">
          <PropertyCharacteristics property={property} updatePolicy={updatePolicy} />
        </div>
        <div className="property-characteristics-container">
          <RiskFactors property={property} updatePolicy={updatePolicy} />
        </div>
        {/* <div className="property-characteristics-container risk-management">
            <RiskManagement property={property} updatePolicy={updatePolicy} />
          </div> */}
        <div className="property-characteristics-container underwriting">
          <UnderwritingComments property={property} updatePolicy={updatePolicy} />
        </div>

      </Grid>
      <Grid item xs={12} className="footer-wrapper">
        <div className="property-characteristics-container footer-container">
          <Footer policyState={state} primary={primary} setPolicyState={setState} property={property} />
        </div>
      </Grid>
    </Grid>
  );

}


PolicyPage.defaultProps = {
  loading: false
}

const themePolicyPage = withTheme(PolicyPage);

export default themePolicyPage;
