import React from 'react';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const AdminTicketMenu = () => {
  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        Tickets
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <Link to='/tickets/create'>Create Ticket</Link>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <Link to='/tickets'>View tickets</Link>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default AdminTicketMenu;
