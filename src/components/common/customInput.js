import React, {Component} from 'react';
import Proptypes from 'prop-types';



class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
  }

  inputChange(e) {
    const {
      action, 
      stateVariable
    } = this.props;
    const change = e.target.value;
    action(stateVariable, change);
  }

  render = () => {
    const {
      name,
      type,
      value,
      disabled,
      token
    } = this.props;

    let updatedValue;
    if (token === 'currency' && !/^[0-9]+$/.test(value)) {
      updatedValue = `$0`
    } else if (token === 'currency' && /^[0-9]+$/.test(value)){
      updatedValue = `$${value}`
    } else if (token === 'age' && !/^[0-9]+$/.test(value)) {
      updatedValue = 0
    } else if (token === 'age' && /^[0-9]+$/.test(value)) {
      updatedValue = value
    } else if (token === 'sqft' && !/^[0-9]+$/.test(value)) {
      updatedValue = 0
    } else {
      updatedValue = value;
    }
    return (
      <React.Fragment>
        <input name={name} type={type} value={updatedValue} disabled={disabled} onChange={this.inputChange}/>
      </React.Fragment>
    );

  };
}

CustomInput.propTypes = {
  name: Proptypes.string,
  type: Proptypes.string,
  value: Proptypes.any
}

export default CustomInput;
