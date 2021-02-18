import React from 'react';
import './../style/NavBar.css';
import { Navbar, Nav } from 'react-bootstrap';
import { FaTh } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';

/**
 * This is the NavBar component.
 */

class NavBar extends React.Component {

  render() {
    return (
      <>
      <Navbar bg="white" sticky="top" id="NavBar">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/about"><FaTh /> About</Nav.Link>
          <Nav.Link href="/contact"><FaEnvelope /> Contact</Nav.Link>
        </Nav>
      </Navbar>
      </>

    );
  }  
}

export default NavBar;