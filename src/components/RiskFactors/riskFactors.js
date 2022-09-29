import React, {Component} from 'react';
import _ from 'lodash';
import CustomForm from '../common/customForm';
import './riskFactors.css';


// MUI Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { withTheme } from '@mui/styles';

class RiskFactors extends Component {
  constructor(props){
    super(props);
    this.state = {
      policyNumber: ''
    };
  }
  
  renderRiskFactors() {
    const {
      property,
      updatePolicy
    } = this.props;
    const RiskFactorsConfig = [
      {
        name: 'Number of CAT Claims in the Past 3 Years',
        component: 'select',
        htmlFor:"Number of CAT Claims in the Past 3 Years",
        label:"Number of CAT Claims in the Past 3 Years",
        id: 'Number of CAT Claims in the Past 3 Years',
        className: 'catClaims',
        list: ['0', '1', '2', '3+'],
        value: (_.get(property, 'policies[0].catClaims', '')) >= 3 ? '3+' : (_.get(property, 'policies[0].catClaims', '')),
        stateVariable: 'catClaims',
        action: updatePolicy,
      },
      {
        name: 'Number of Non CAT Claims in the Past 3 Years',
        component: 'select',
        htmlFor:"Number of Non CAT Claims in the Past 3 Years",
        label:"Number of Non CAT Claims in the Past 3 Years",
        id: 'Number of Non CAT Claims in the Past 3 Years',
        className: 'nonCatClaims',
        list: ['0', '1', '2', '3+'],
        value: (_.get(property, 'policies[0].nonCatClaims', '')) >= 3 ? '3+' : (_.get(property, 'policies[0].nonCatClaims', '')),
        stateVariable: 'nonCatClaims',
        action: updatePolicy,
      },
      {
        name: 'Number of Liability Only Claims in the Past 3 Years',
        component: 'select',
        htmlFor:"Number of Liability Only Claims in the Past 3 Years",
        label:"Number of Liability Only Claims in the Past 3 Years",
        id: 'Number of Liability Only Claims in the Past 3 Years',
        className: 'liabilityClaims',
        list: ['0', '1', '2', '3+'],
        value: (_.get(property, 'policies[0].liabilityClaims', '')) >= 3 ? '3+' : (_.get(property, 'policies[0].liabilityClaims', '')),
        stateVariable: 'liabilityClaims',
        action: updatePolicy,
      },
      {
        name: 'Protection Class',
        component: 'select',
        htmlFor:"Protection Class",
        label:"Protection Class",
        id: 'Protection Class',
        className: 'protectionClass',
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        value: (_.get(property, 'policies[0].protectionClass', '')),
        stateVariable: 'protectionClass',
        action: updatePolicy,
      }
    ];
    return (
      <Grid container className="property-characteristics">
        <Typography variant='h6'>Risk Factors</Typography>
        <Grid item className="risk-form">
          <CustomForm config={RiskFactorsConfig} formType="risk-factors" />
        </Grid>
      </Grid>
    );
  }

  render = () => {
    return (
      this.renderRiskFactors()
    );

  };
}

export default RiskFactors;
