import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Card, CardBody, CardHeader, Container, Table, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

import EditTicketModal from '../modals/EditTicketModal';

import { getTickets } from '../../actions/ticketActions';
import { getProjects } from '../../actions/projectActions';
import { getUsers } from '../../actions/userActions';
import { deleteTicket } from '../../actions/ticketActions';
import { history } from '../../configureStore';

export class Tickets extends Component {
  state = {
    modal: false,
    editTicket: [],
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    ticket: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getTickets: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
  };
  componentWillMount() {
    this.props.getProjects();
    this.props.getTickets();
    this.props.getUsers();
  }
  handleEdit = (event) => {
    //  The modal is close
    if (!this.state.modal) {
      let id = event.target.parentNode.id;

      //  If svg or <th> is clicked, sometimes we dont get id
      //  this fix the bug
      if (!id) {
        id = event.target.id;
      }

      let editTicket = this.props.ticket.tickets.filter(
        (ticket) => ticket._id === id
      );
      //let editUserTicket = this.props.user.users.filter();
      this.setState({
        editTicket: editTicket[0],
        modal: true,
      });
    } else {
      this.setState({
        modal: false,
        editTicket: [],
      });
    }
  };
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  getUserFromID = (id) => {
    //  If ID is null then te ticket is unassigned
    if (id === '') {
      return 'Unassigned';
    }
    const { users } = this.props.user;
    const filteredUser = users.filter((user) => user._id === id);
    //  If no user has been found, return default
    if (filteredUser.length !== 0) {
      return filteredUser[0].email;
    }
    return 'User not Found';
  };

  getProjectNameFromTicket = (projects, ticket) => {
    if (projects.length > 0) {
      try {
        return projects.filter((project) => project._id === ticket.projectID)[0]
          .name;
      } catch (err) {
        console.log(err);
      }
    }
  };
  handleView = (event) => {
    //  The modal is close
    let id = event.target.parentNode.id;
    //  If svg or <th> is clicked, sometimes we dont get id
    //  this fix the bug
    if (!id) {
      id = event.target.id;
    }
    history.push(`/tickets/view/${id}`);
  };
  handleDelete = (event) => {
    const { projects } = this.props.project;

    //  The modal is close
    let id = event.target.parentNode.id;
    //  If svg or <th> is clicked, sometimes we dont get id
    //  this fix the bug
    if (!id) {
      id = event.target.id;
    }
    const projectID = projects.filter((project) =>
      project.tickets.includes(id)
    )[0];
    console.log('delete: ', id, 'project: ', projectID._id);
    this.props.deleteTicket(id, projectID._id);
  };
  render() {
    const { tickets } = this.props.ticket;
    const { projects } = this.props.project;
    const { users } = this.props.user;
    const { role } = this.props.auth;
    const hasRightToDelete = role === 'ADMIN' || role === 'PROJECT_MANAGER';
    return (
      <Container className="tickets-list">
        <Col>
          {this.state.modal ? (
            <EditTicketModal
              modal={this.state.modal}
              users={users}
              projects={projects}
              editTicket={this.state.editTicket}
              toggleModal={this.toggleModal}
            />
          ) : (
            ''
          )}
          <Card>
            <CardHeader className="text-center">Tickets List</CardHeader>
            <CardBody>
              <Table hover>
                <thead>
                  <tr className="text-center">
                    <th>title</th>
                    <th>created by</th>
                    <th>assigned_to</th>
                    <th>status</th>
                    <th>Project</th>
                    <th>Edit</th>
                    <th>View</th>
                    {hasRightToDelete ? <th>Delete</th> : ''}
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => {
                    return (
                      <tr
                        key={ticket._id}
                        id={ticket._id}
                        className="text-center"
                      >
                        <th>{ticket.title}</th>
                        <th>{this.getUserFromID(ticket.created_by)}</th>
                        <th>{this.getUserFromID(ticket.assigned_to)}</th>
                        <th>{ticket.status}</th>
                        <th>
                          {this.getProjectNameFromTicket(projects, ticket)}
                        </th>
                        <th
                          id={ticket._id}
                          onClick={this.handleEdit}
                          style={{ cursor: 'pointer' }}
                        >
                          <FontAwesomeIcon id={ticket._id} icon={faEdit} />
                        </th>
                        <th
                          onClick={this.handleView}
                          id={ticket._id}
                          style={{ cursor: 'pointer' }}
                        >
                          <FontAwesomeIcon
                            id={ticket._id}
                            icon={faEye}
                          ></FontAwesomeIcon>
                        </th>
                        {hasRightToDelete ? (
                          <th
                            id={ticket._id}
                            onClick={this.handleDelete}
                            style={{ cursor: 'pointer' }}
                          >
                            <FontAwesomeIcon id={ticket._id} icon={faTrash} />
                          </th>
                        ) : (
                          ''
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  isLoading: state.ticket.isLoading,
  project: state.project,
  ticket: state.ticket,
  user: state.user,
});
export default connect(mapStateToProps, {
  getTickets,
  getProjects,
  getUsers,
  deleteTicket,
})(Tickets);
