import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { history } from '../../../configureStore';
const MenuAdmin = () => {
  const handleClickCreateTicket = () => history.push(`/tickets/create`);
  const handleClickMenuTicket = () => history.push(`/tickets`);
  const handleClickMenuProject = () => history.push(`/projects/view`);
  const handleClickCreateProject = () => history.push(`/projects/create`);
  const handleClickMenuUser = () => history.push(`/users/create`);

  return (
    <>
      <ListGroup>
        <ListGroupItem active tag='button' onClick={handleClickMenuTicket}>
          Tickets
        </ListGroupItem>
        <ListGroupItem onClick={handleClickCreateTicket}>
          Create Ticket
        </ListGroupItem>
      </ListGroup>
      <ListGroup>
        <ListGroupItem active tag='button' onClick={handleClickMenuProject}>
          Projects
        </ListGroupItem>
        <ListGroupItem onClick={handleClickCreateProject}>
          Create Projects
        </ListGroupItem>
      </ListGroup>
      <ListGroup>
        <ListGroupItem active tag='button' onClick={handleClickMenuUser}>
          User Roles
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default MenuAdmin;
