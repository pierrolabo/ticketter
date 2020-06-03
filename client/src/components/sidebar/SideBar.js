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
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import SubMenu from './SubMenu';

const SideBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className='sideBar-container d-none d-xl-block'>
      <Navbar vertical color='dark' light expand='sm'>
        <NavbarToggler onClick={toggle} />
        <NavbarBrand className='position-fixed' href='/'>
          reactstrap
        </NavbarBrand>
        <Collapse
          className='position-fixed sidebar-position'
          isOpen={isOpen}
          navbar
        >
          <Nav vertical className='list-unstyled bg-dark sideBar'>
            <NavItem className='menu-item'>
              <NavLink href='/components/'>Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/reactstrap/reactstrap'>
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
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
