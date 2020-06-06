import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import {
  NavItem,
  NavLink,
  Nav,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  toggle,
  Collapse,
  NavbarText,
} from 'reactstrap';

import { Link } from 'react-router-dom';

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
          Defect
          className='position-fixed sidebar-position'
          isOpen={isOpen}
          navbar
        >
          <Nav vertical className='list-unstyled bg-dark sideBar'>
            <NavItem className='menu-item'>
              <NavLink href='/Tickets'>Tickets</NavLink>
            </NavItem>
            <NavItem>
              <Link to='/users'>User Roles</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Projects
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>New Project</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Assign Users</DropdownItem>
                <DropdownItem>Remove Users</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>View Projects</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavbarText>Simple Text</NavbarText>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
const submenus = [
  [
    {
      title: 'Home 1',
      target: 'Home-1',
    },
    {
      title: 'Home 2',
      target: 'Home-2',
    },
    {
      itle: 'Home 3',
      target: 'Home-3',
    },
  ],
  [
    {
      title: 'Page 1',
      target: 'Page-1',
    },
    {
      title: 'Page 2',
      target: 'Page-2',
    },
  ],
];

export default SideBar;
