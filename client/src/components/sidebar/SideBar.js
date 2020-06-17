import React, { useState } from 'react';
import {
  NavItem,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
} from 'reactstrap';

import { Link } from 'react-router-dom';

import AdminTicketMenu from './AdminTicketMenu';
import AdminProjectMenu from './AdmiProjectMenu';
const SideBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className='sideBar-container d-none d-xl-block'>
      <Navbar vertical color='dark' light expand='sm'>
        <NavbarToggler onClick={toggle} />
        <NavbarBrand className='position-fixed' href='/home'>
          Ticketter
        </NavbarBrand>
        <Collapse
          defect='true'
          className='position-fixed sidebar-position'
          isOpen={isOpen}
          navbar
        >
          <Nav vertical className='list-unstyled bg-dark sideBar'>
            {props.role === 'ADMIN' ? (
              <AdminTicketMenu></AdminTicketMenu>
            ) : (
              <h1>not pass</h1>
            )}

            {props.role === 'ADMIN' ? (
              <AdminProjectMenu></AdminProjectMenu>
            ) : (
              <h1>not pass</h1>
            )}
            <NavItem>
              <Link to='/users'>User Roles</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default SideBar;
