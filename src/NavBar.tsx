import React from 'react';
import './NavBar.css';
import { Navbar, Nav } from 'react-bootstrap';
// import { FaTh } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';

/**
 * This is the NavBar component.
 */
 

class NavBar extends React.Component {

  render() {
    return (
      <>
      <Navbar bg="white" sticky="top" id="NavBar">
        <Navbar.Brand href="/#home">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/#about"><FaUser /> About</Nav.Link>
          {/* <Nav.Link href="/#portfolio"><FaTh /> Portfolio</Nav.Link> */}
          <Nav.Link href="/#contact"><FaEnvelope /> Contact</Nav.Link>
        </Nav>
      </Navbar>
      </>

    );
  }  
}

export default NavBar;