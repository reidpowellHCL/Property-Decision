import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css'

function Footer (props) {

   const { policyState, property } = props;

    return (
      <div className="footer">
        <div className="footer-left">
          <Link to='/' className='footer-left'>
            <button className={`Back-btn-${policyState.backButtonClass}`}>Back</button>
          </Link>
        </div>
        <div className="footer-right">
          <button className={`Submit-btn-${property.submitButtonClass}`}>Submit</button>
          <button className={`Save-btn-${property.saveButtonClass}`}>Save</button>
          <Link to='/' className='footer-linked-button'>
          <button className={`Cancel-btn-${policyState.cancelButtonClass}`}>Cancel</button>
          </Link>
          
        </div>
      </div>
    );

  }



export default Footer;
