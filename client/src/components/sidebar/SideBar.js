import React from 'react';

import TicketMenu from './TicketMenu/TicketMenu';
import ProjectMenu from './ProjectMenu/ProjectMenu';
import MenuAdmin from './MenuAdmin/MenuAdmin';
import GeneralMenu from './GeneralMenu/GeneralMenu';
import './SideBar.css';
const SideBar = (props) => {
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
    </div>
  );
};
export default SideBar;
