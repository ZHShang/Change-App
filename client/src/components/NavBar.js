import React, { Component } from 'react';
import { Button, ButtonToolbar, Nav, NavDropdown, Navbar}  from 'react-bootstrap';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';
import { HashLink as Links } from 'react-router-hash-link';
import '../nav.css';
import '../App.css';


class NavBar extends Component {
  render() {
    const {
      mainState: state,
      handleLogout,
      handleVoteSelection,
      getTransactions,
    } = this.props;

    return(
      <div>
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand to="/">The Change Collective</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Links to="/#home-why">Why</Links></Nav.Link>
            <Nav.Link><Links to="/#home-collective">The Collective</Links></Nav.Link>
            <Nav.Link><Links to="/#home-charities">Charities</Links></Nav.Link>
            {state.isLoggedIn ? (
            <ButtonToolbar>
            <form onSubmit={handleLogout} >
              <Button type="submit" className='mr-1 logPad' variant="outline-dark">Logout</Button>
            </form>
            <form>
            <Button className='mr-1' variant="outline-dark"><Link to="/dashboard">Dashboard</Link></Button>
            </form>
          </ButtonToolbar>
            ) : (
          <ButtonToolbar>
            <Button className='mr-1' variant="outline-dark"><Link to="/login">Login</Link></Button>
            <Button className='mr-1' variant="outline-dark"><Link to="/register">Register</Link></Button>
          </ButtonToolbar>
          )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    )
  }
}



export default NavBar;