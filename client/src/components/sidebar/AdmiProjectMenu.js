import React, { useState } from 'react';

import {
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const AdminProjectMenu = () => {
  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        Projects
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <Link to='/projects/create'>Create Projects</Link>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <Link to='/projects/view'>View Projects</Link>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default AdminProjectMenu;
