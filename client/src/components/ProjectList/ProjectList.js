import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, CardBody, CardHeader, Container, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";

import { getUsers } from "../../actions/userActions";
import { getProjects } from "../../actions/projectActions";
import { deleteProject } from "../../actions/projectActions";

import EditProjectModal from "../modals/EditProjectModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import { history } from "../../configureStore";
export class ProjectList extends Component {
  state = {
    modal: false,
    editProject: null,
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getProjects();
    this.props.getUsers();
  }
  toggleModal = (event) => {
    if (!this.state.modal) {
      let id = event.target.parentNode.id;
      //  If svg or <th> is clicked, sometimes we dont get id
      //  this fix the bug
      if (!id) {
        id = event.target.id;
      }
      this.setState({
        modal: true,
        editProject: this.props.project.projects.filter(
          (project) => project._id === id
        )[0],
      });
    } else {
      this.setState({
        modal: false,
        editProject: null,
      });
    }
  };

  handleDelete = (id) => {
    this.props.deleteProject(id);
  };
  handleClick = (e) => history.push(`/project/view/${e.target.id}`);

  render() {
    const { projects } = this.props.project;
    const hasRightToModify =
      this.props.auth.role === "ADMIN" ||
      this.props.auth.role === "PROJECT_MANAGER";
    return (
      <Container>
        {this.state.modal ? (
          <EditProjectModal
            users={this.props.user.users}
            modal={this.state.modal}
            projects={projects}
            editProject={this.state.editProject}
            toggleModal={this.toggleModal}
          />
        ) : (
          ""
        )}
        <Card>
          <CardHeader className="text-center">Project List</CardHeader>
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Tickets</th>
                  <th>View</th>
                  {hasRightToModify ? <th>Edit</th> : null}
                  {hasRightToModify ? <th>Delete</th> : null}
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => {
                  let projectNbr = project.tickets ? project.tickets.length : 0;
                  return (
                    <tr key={project._id}>
                      <th>{project.name}</th>
                      <th>{project.description}</th>
                      <th>{projectNbr}</th>
                      <th id={project._id} onClick={this.handleClick}>
                        <FontAwesomeIcon
                          id={project._id}
                          icon={faEye}
                        ></FontAwesomeIcon>
                      </th>
                      {hasRightToModify ? (
                        <th id={project._id} onClick={this.toggleModal}>
                          <FontAwesomeIcon id={project._id} icon={faEdit} />
                        </th>
                      ) : null}
                      {hasRightToModify ? (
                        <ConfirmDeleteModal
                          projectID={project._id}
                          delete={this.handleDelete}
                        />
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isLoading: state.ticket.isLoading,
  project: state.project,
  user: state.user,
});
export default connect(mapStateToProps, {
  getUsers,
  getProjects,
  deleteProject,
})(ProjectList);
