import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { history } from '../../../configureStore';
const GeneralMenu = () => {
  const handleClick = (e) => history.push(`/home`);

  return (
    <ListGroup>
      <ListGroupItem
        className='menu-head'
        active
        tag='button'
        onClick={handleClick}
      >
        Menu
      </ListGroupItem>
    </ListGroup>
  );
};

export default GeneralMenu;
