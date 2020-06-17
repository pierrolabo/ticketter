import React, { Component, Fragment } from 'react';
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
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import EditTicketModal from '../modals/EditTicketModal';

import { getTickets } from '../../actions/ticketActions';
import { getProjects } from '../../actions/projectActions';
import { getUsers } from '../../actions/userActions';

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
  componentWillMount() {}
  componentDidMount() {
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
        (ticket) => ticket._id == id
      );
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

  getUserFromID = (users, id) => {
    //  if is unassigned
    if (id == '') {
      return 'UNASSIGNED';
    }
    if (users.length > 0) {
      let userAssigned = users.filter((user) => user._id == id)[0];
      return `${userAssigned.name} ${userAssigned.lastname}`;
    }
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
  render() {
    const { tickets } = this.props.ticket;
    const { projects } = this.props.project;
    const { users } = this.props.user;
    return (
      <Container className='tickets-list'>
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
          <CardHeader>Tickets List</CardHeader>
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>title</th>
                  <th>created by</th>
                  <th>assigned_to</th>
                  <th>status</th>
                  <th>Project</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => {
                  return (
                    <tr key={ticket._id} id={ticket._id} scope='row'>
                      <th>{ticket._id}</th>
                      <th>{ticket.title}</th>
                      <th>{ticket.created_by}</th>
                      <th>{this.getUserFromID(users, ticket.assigned_to)}</th>
                      <th>{ticket.status}</th>
                      <th>{this.getProjectNameFromTicket(projects, ticket)}</th>
                      <th id={ticket._id} onClick={this.handleEdit}>
                        <FontAwesomeIcon id={ticket._id} icon={faEdit} />
                      </th>
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
  ticket: state.ticket,
  user: state.user,
});
export default connect(mapStateToProps, { getTickets, getProjects, getUsers })(
  Tickets
);
