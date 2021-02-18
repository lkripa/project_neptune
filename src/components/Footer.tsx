import React from 'react';
import './../style/Footer.css';

// import { FaLinkedinIn } from 'react-icons/fa';
// import { FaGithub } from 'react-icons/fa';
// import { FaEnvelope } from 'react-icons/fa';

/**
 * This is the Footer component.
 */

class Footer extends React.Component {	
  render() {
    return (
      <div className="footer">
        <div className="contact">
          {/* <a href="https://github.com/lkripa" className="wide"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/lkripa/" className="wide"><FaLinkedinIn /></a>
          <a href="mailto:lara@lkripa.com" className="wide"><FaEnvelope /></a> */}
        </div>

        <h6>Copyright © Project Neptune 2021</h6>
      </div>
    );
  }
}

export default Footer;