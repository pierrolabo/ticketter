import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { history } from '../../../configureStore';
const MenuAdmin = () => {
  const handleClickCreateTicket = () => history.push(`/tickets/create`);
  const handleClickMenuTicket = () => history.push(`/tickets`);
  const handleClickMenuProject = () => history.push(`/projects`);
  const handleClickCreateProject = () => history.push(`/projects/create`);
  const handleClickMenuUser = () => history.push(`/users/`);

  return (
    <>
      <ListGroup>
        <ListGroupItem
          className='menu-head'
          active
          tag='button'
          onClick={handleClickMenuTicket}
        >
          All Tickets
        </ListGroupItem>
        <ListGroupItem className='menu-head' onClick={handleClickCreateTicket}>
          Create Ticket
        </ListGroupItem>
      </ListGroup>
      <ListGroup>
        <ListGroupItem
          className='menu-head'
          active
          tag='button'
          onClick={handleClickMenuProject}
        >
          All Projects
        </ListGroupItem>
        <ListGroupItem className='menu-head' onClick={handleClickCreateProject}>
          Create Projects
        </ListGroupItem>
      </ListGroup>
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
    </>
  );
};

export default MenuAdmin;
