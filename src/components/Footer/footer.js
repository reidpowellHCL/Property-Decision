import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

import './footer.css'

function Footer (props) {

   const { policyState, setPolicyState } = props;

    return (
      <div className="footer">
        <div className="footer-left">
          <Link to='/' className='footer-left'>
            <button className={`Back-btn-${policyState.backButtonClass}`}>Back</button>
          </Link>
        </div>
        <div className="footer-right">
          <button className={`Submit-btn-${policyState.submitButtonClass}`}>Submit</button>
          <button className={`Save-btn-${policyState.saveButtonClass}`}>Save</button>
          <Link to='/' className='footer-linked-button'>
          <button className={`Cancel-btn-${policyState.cancelButtonClass}`}>Cancel</button>
          </Link>
          
        </div>
      </div>
    );

  }



export default Footer;
