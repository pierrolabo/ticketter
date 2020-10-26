import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { history } from "../../../configureStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const TicketMenu = (props) => {
  const { projects, role } = props;
  const hasRightToCreate = role === "PROJECT_MANAGER";
  const handleClick = (e) => history.push(`/project/view/${e.target.id}`);
  const handleClickMenu = () => history.push(`/projects`);
  const handleClickCreate = () => history.push(`/projects/create`);

  return (
    <ListGroup>
      <ListGroupItem
        className="menu-head"
        active
        tag="button"
        onClick={handleClickMenu}
      >
        All my Projects
      </ListGroupItem>

      {projects.map((project, index) => {
        return (
          <ListGroupItem
            key={index}
            className="menu-icon"
            onClick={handleClick}
            id={project._id}
            tag="button"
            action
          >
            <FontAwesomeIcon icon={faFolder}></FontAwesomeIcon>
            {project.name}
          </ListGroupItem>
        );
      })}
      {hasRightToCreate ? (
        <ListGroupItem
          className="menu-head"
          active
          tag="button"
          onClick={handleClickCreate}
        >
          Create a project
        </ListGroupItem>
      ) : (
        ""
      )}
    </ListGroup>
  );
};

export default TicketMenu;
