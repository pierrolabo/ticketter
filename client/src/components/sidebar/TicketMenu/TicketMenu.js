import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { history } from '../../../configureStore';
const TicketMenu = (props) => {
  const { tickets } = props;
  const handleClick = (e) => history.push(`/tickets/view/${e.target.id}`);
  const handleClickMenu = () => history.push(`/tickets`);

  return (
    <ListGroup>
      <ListGroupItem active tag='button' onClick={handleClickMenu}>
        All my Tickets
      </ListGroupItem>
      {tickets.map((ticket, index) => {
        return (
          <ListGroupItem
            onClick={handleClick}
            id={ticket._id}
            tag='button'
            action
          >
            {ticket.title}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default TicketMenu;
