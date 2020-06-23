import React from 'react';

import TicketMenu from './TicketMenu/TicketMenu';
import ProjectMenu from './ProjectMenu/ProjectMenu';
import MenuAdmin from './MenuAdmin/MenuAdmin';
import GeneralMenu from './GeneralMenu/GeneralMenu';
import { ListGroupItem, ListGroup } from 'reactstrap';
import './SideBar.css';
import { history } from '../../configureStore';

const SideBar = (props) => {
  const handleClickMenuUser = () => history.push(`/users/`);

  const { tickets, projects, role } = props;
  const hasAtLeastOneProject = projects.length > 0;
  return (
    <div className='sidebar'>
      <GeneralMenu />
      {props.role !== 'ADMIN' ? (
        <>
          {hasAtLeastOneProject ? (
            <>
              <TicketMenu tickets={tickets} role={role} projects={projects} />
              <ProjectMenu projects={projects} role={role} />
            </>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}
      {props.role === 'ADMIN' ? <MenuAdmin /> : ''}
      {props.role === 'PROJECT_MANAGER' ? (
        <ListGroup>
          <ListGroupItem
            className='menu-head'
            active
            tag='button'
            onClick={handleClickMenuUser}
          >
            User Roles
          </ListGroupItem>
        </ListGroup>
      ) : (
        ''
      )}
    </div>
  );
};
export default SideBar;
