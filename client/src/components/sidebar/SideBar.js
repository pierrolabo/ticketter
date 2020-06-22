import React from 'react';

import TicketMenu from './TicketMenu/TicketMenu';
import ProjectMenu from './ProjectMenu/ProjectMenu';
import MenuAdmin from './MenuAdmin/MenuAdmin';
import GeneralMenu from './GeneralMenu/GeneralMenu';
import './SideBar.css';
const SideBar = (props) => {
  const { tickets, projects, role } = props;

  return (
    <div className='sidebar'>
      <GeneralMenu />
      {props.role !== 'ADMIN' ? (
        <>
          <TicketMenu tickets={tickets} role={role} />
          <ProjectMenu projects={projects} role={role} />
        </>
      ) : (
        ''
      )}
      {props.role === 'ADMIN' ? <MenuAdmin /> : ''}
    </div>
  );
};
export default SideBar;
