import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../../configureStore';
const TicketMenu = (props) => {
  const { tickets } = props;
  const handleClick = (e) => history.push(`/tickets/view/${e.target.id}`);
  const handleClickMenu = () => history.push(`/tickets`);
  const handleClickCreate = () => history.push(`/tickets/create`);
  return (
    <ListGroup>
      <ListGroupItem
        className="ticketmenu menu-head"
        active
        tag="button"
        onClick={handleClickMenu}
      >
        All my Tickets
      </ListGroupItem>

      {tickets.map((ticket, index) => {
        if (!ticket.isCompleted) {
          return (
            <ListGroupItem
              key={ticket._id}
              className="menu-icon"
              onClick={handleClick}
              id={ticket._id}
              tag="button"
              action
            >
              <FontAwesomeIcon icon={faTicketAlt}></FontAwesomeIcon>
              {ticket.title}
            </ListGroupItem>
          );
        }
        return null;
      })}
      <ListGroupItem
        className="menu-head"
        active
        tag="button"
        onClick={handleClickCreate}
      >
        Create a ticket
      </ListGroupItem>
    </ListGroup>
  );
};

export default TicketMenu;
