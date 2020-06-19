import React from 'react';

import TicketMenu from './TicketMenu/TicketMenu';
import ProjectMenu from './ProjectMenu/ProjectMenu';
import MenuAdmin from './MenuAdmin/MenuAdmin';

const SideBar = (props) => {
  const { tickets, projects } = props;

  return (
    <div className='sidebar'>
      {props.role !== 'ADMIN' ? (
        <>
          <TicketMenu tickets={tickets} />
          <ProjectMenu projects={projects} />
        </>
      ) : (
        ''
      )}
      {props.role === 'ADMIN' ? <MenuAdmin /> : ''}
    </div>
  );
};
export default SideBar;
