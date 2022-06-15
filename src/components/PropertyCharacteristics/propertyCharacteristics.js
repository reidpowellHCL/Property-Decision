import React, {Component} from 'react';
import _ from 'lodash';
import CustomForm from '../common/customForm';
import './propertyCharacteristics.css';


// MUI Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { withTheme } from '@mui/styles';

class PropertyCharacteristics extends Component {
  constructor(props){
    super(props);
    this.state = {
      policyNumber: ''
    };
  }
  
  renderPropertyCharacteristics() {
    const {
      property,
      updatePolicy
    } = this.props;
    const PropertyCharacteristicsConfig = [
      {
        name: 'Age of Dwelling',
        component: 'text',
        htmlFor:"Age of Dwelling",
        label:"Age of Dwelling (years)",
        type: 'text',
        className: 'ageOfDwelling',
        value: `${_.get(property, 'policies[0].ageOfDwelling', '')}`,
        stateVariable: 'ageOfDwelling',
        action: updatePolicy,
        token: 'age'
      },
      {
        name: 'Age of Roof',
        component: 'text',
        htmlFor:"Age of Roof",
        label:"Age of Roof (years)",
        id: 'Age of Roof',
        type: 'text',
        className: 'ageOfRoof',
        value: `${_.get(property, 'policies[0].ageOfRoof', '')}`,
        stateVariable: 'ageOfRoof',
        action: updatePolicy,
        token: 'age'
      },
      {
        name: 'Roof Type',
        component: 'select',
        htmlFor:"Roof Type",
        label:"Roof Type",
        id: 'Roof Type',
        className: 'roofType',
        list: ['Comp Shingle', 'Tar and Gravel', 'Metal', 'Slate', 'Tile', 'Wood', 'other'],
        value: (_.get(property, 'policies[0].roofType', '')),
        stateVariable: 'roofType',
        action: updatePolicy
      },
      {
        name: 'Siding',
        component: 'select',
        htmlFor:"Siding",
        label:"Siding",
        id: 'Siding',
        className: 'siding',
        list: ['Vinyl Siding', 'Metal (Aluminum or Steel)', 'Wood', 'Stucco', 'other'],
        value: (_.get(property, 'policies[0].siding', '')),
        stateVariable: 'siding',
        action: updatePolicy,
      },
      {
        name: 'Garage',
        component: 'select',
        htmlFor:"Garage",
        label:"Garage",
        id: 'Garage',
        className: 'garage',
        list: ['No Garage', 'Attached', 'Detached'],
        value: (_.get(property, 'policies[0].garage', '')),
        stateVariable: 'garage',
        action: updatePolicy,
      },
      {
        name: 'Dwelling Square Feet',
        component: 'text',
        htmlFor:"Dwelling Square Feet",
        label:"Dwelling Square Ft.",
        type: 'text',
        className: 'dwellingSquareFeet',
        value: `${_.get(property, 'policies[0].dwellingSqft', '')}`,
        stateVariable: 'dwellingSqft',
        action: updatePolicy,
        token: 'sqft'
      },
      {
        name: 'Water Loss Prevention Device',
        component: 'select',
        htmlFor:"Water Loss Prevention Device",
        label:"Water Loss Prevention Device",
        id: 'Water Loss Prevention Device',
        className: 'waterLossPreventionDevice',
        list: ['Yes', 'No'],
        value: (_.get(property, 'policies[0].waterLossPrevention', '')),
        stateVariable: 'waterLossPrevention',
        action: updatePolicy,
      },
      {
        name: 'Smart Dwelling',
        component: 'select',
        htmlFor:"Smart Dwelling",
        label:"Smart Dwelling",
        id: 'Smart Dwelling',
        className: 'smartDwelling',
        list: ['Yes', 'No'],
        value: (_.get(property, 'policies[0].smartDwelling', '')),
        // value: (_.get(property, 'policies[0].videoAndSmartDwelling', '') === 'Yes' ? 'No' : _.get(property, 'policies[0].smartDwelling', '')),
        stateVariable: 'smartDwelling',
        action: updatePolicy,
        disabled: _.get(property, 'policies[0].videoAndSmartDwelling', '') === 'Yes' ? true : false
      },
      {
        name: 'Video & Smart Dwelling',
        component: 'select',
        htmlFor:"Video & Smart Dwelling",
        label:"Video & Smart Dwelling",
        id: 'Video & Smart Dwelling',
        className: 'videoSmartDwelling',
        list: ['Yes', 'No'],
        value: (_.get(property, 'policies[0].videoAndSmartDwelling', '')),
        stateVariable: 'videoAndSmartDwelling',
        action: updatePolicy,
        disabled: _.get(property, 'policies[0].smartDwelling', '') === 'Yes' &&
        _.get(property, 'policies[0].videoAndSmartDwelling', '') === 'No' ? true : false
      }
    ];
    return (
      <Grid container className="property-characteristics">
        <Typography variant='h6' style={{margin: '0 0 20px 0'}}>Property Characteristics</Typography>
        <Grid item xs={12} className="characteristics">
          <CustomForm config={PropertyCharacteristicsConfig} formType="property-characteristics" />
        </Grid>
      </Grid>
    );
  }

  render = () => {
    return (
      this.renderPropertyCharacteristics()
    );

  };
}

export default PropertyCharacteristics;
