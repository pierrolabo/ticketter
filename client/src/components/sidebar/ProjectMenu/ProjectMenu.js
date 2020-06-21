import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { history } from '../../../configureStore';
const TicketMenu = (props) => {
  const { projects } = props;
  const handleClick = (e) => history.push(`/project/view/${e.target.id}`);
  const handleClickMenu = () => history.push(`/projects`);

  return (
    <ListGroup>
      <ListGroupItem active tag='button' onClick={handleClickMenu}>
        All my Projects
      </ListGroupItem>
      {projects.map((project, index) => {
        return (
          <ListGroupItem
            onClick={handleClick}
            id={project._id}
            tag='button'
            action
          >
            {project.name}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default TicketMenu;
