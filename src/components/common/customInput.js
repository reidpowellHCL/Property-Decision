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
    if (token === 'currency'){
      updatedValue = `$${value}`
    } else {
      updatedValue = value;
    };
    return (
      <React.Fragment>
        {/* {token === 'currency' && <i>$</i>} */}
        <input name={name} type={type} value={updatedValue} disabled={disabled} onChange={this.inputChange}/>
        {/* {token === 'percent' && <i>%</i>}
        {token === 'age' && <i>Years</i>}
        {token === 'sqft' && <i>Sqft</i>} */}
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
