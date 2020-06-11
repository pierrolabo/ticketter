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

import { getTickets } from '../../actions/ticketActions';
import { getProjects } from '../../actions/projectActions';

export class Tickets extends Component {
  state = {
    modal: false,
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    ticket: PropTypes.object.isRequired,
    getTickets: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getProjects();
    this.props.getTickets();
  }
  handleEdit = (event) => {
    console.log('clicked: ', event.target);
    //  The modal is close
    if (!this.state.modal) {
      let id = event.target.id;
      //  If svg or <th> is clicked, sometimes we dont get id
      //  this fix the bug
      if (!id) {
        id = event.target.id;
      }

      let editTicket = this.props.ticket.tickets.filter(
        (ticket) => ticket._id == id
      );
      console.log('id: ', id);
      console.log('editedticket: ', editTicket);
    }
  };
  render() {
    const { tickets } = this.props.ticket;
    const { projects } = this.props.project;
    return (
      <Container className='tickets-list'>
        <Card>
          <CardHeader>Tickets List</CardHeader>
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>title</th>
                  <th>description</th>
                  <th>created by</th>
                  <th>status</th>
                  <th>Project</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => {
                  return (
                    <tr id={ticket._id} scope='row'>
                      <th>{ticket._id}</th>
                      <th>{ticket.title}</th>
                      <th>{ticket.description}</th>
                      <th>{ticket.created_by}</th>
                      <th>{ticket.status}</th>
                      <th>
                        {
                          projects.filter(
                            (project) => project._id === ticket.projectID
                          )[0].name
                        }
                      </th>
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
  ticket: state.ticket,
  project: state.project,
});
export default connect(mapStateToProps, { getTickets, getProjects })(Tickets);
