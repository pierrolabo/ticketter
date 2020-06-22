import React, { Component, Fragment } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Container,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../configureStore';
import { clearProjects } from '../actions/projectActions';
import { logout } from '../actions/authActions';

class NavBar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  handleClick = () => {
    this.props.clearProjects();
    this.props.logout();
  };
  handleLogin = () => {
    history.push('/login');
  };
  handleRegister = () => history.push('/register');
  render() {
    const { isAuthenticated, user } = this.props.auth;

    //Fragment UI
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <NavLink onClick={this.handleClick} href='#'>
            Logout
          </NavLink>
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <NavLink onClick={this.handleRegister} href='#'>
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={this.handleLogin} href='#'>
            Login
          </NavLink>
        </NavItem>
      </Fragment>
    );

    return (
      <div className='navbar-container '>
        <Navbar color='dark' dark expand='sm' className='mb-8'>
          <Container>
            <NavbarBrand className='d-xl-none' href='/'>
              Ticketter
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { clearProjects, logout })(NavBar);
