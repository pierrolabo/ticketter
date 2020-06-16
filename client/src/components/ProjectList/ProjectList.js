import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Table,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { getProjects } from '../../actions/projectActions';
import { deleteProject } from '../../actions/projectActions';

import EditProjectModal from '../modals/EditProjectModal';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';

export class ProjectList extends Component {
  state = {
    modal: false,
    editProject: null,
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getProjects();
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
          (project) => project._id == id
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
  render() {
    const { projects } = this.props.project;
    return (
      <Container>
        {this.state.modal ? (
          <EditProjectModal
            modal={this.state.modal}
            projects={projects}
            editProject={this.state.editProject}
            toggleModal={this.toggleModal}
          />
        ) : (
          ''
        )}
        <Card>
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Tickets</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => {
                  let projectNbr = project.tickets ? project.tickets.length : 0;
                  return (
                    <tr key={project._id}>
                      <th>{project._id}</th>
                      <th>{project.name}</th>
                      <th>{project.description}</th>
                      <th>{projectNbr}</th>
                      <th id={project._id} onClick={this.toggleModal}>
                        <FontAwesomeIcon id={project._id} icon={faEdit} />
                      </th>
                      {/*
                      <th id={project._id} onClick={this.handleDelete}>
                        <FontAwesomeIcon id={project._id} icon={faTrash} />
                      </th>
                        */}
                      <ConfirmDeleteModal
                        projectID={project._id}
                        delete={this.handleDelete}
                      />
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
});
export default connect(mapStateToProps, { getProjects, deleteProject })(
  ProjectList
);
