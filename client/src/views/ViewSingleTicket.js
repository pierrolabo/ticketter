import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, CardHeader, CardBody, Badge } from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../actions/userActions';
import { getTicket } from '../actions/ticketActions';
import { addReply } from '../actions/ticketActions';
import { clearTicket } from '../actions/ticketActions';
import { deleteReply } from '../actions/ticketActions';
import { Answer } from '../components/Answer/Answer';
import { AddAnswer } from '../components/Answer/AddAnswer';
import SelectSingleUser from '../components/Select/SelectSingleUser';

class ViewSingleTicket extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getTicket: PropTypes.func.isRequired,
    clearTicket: PropTypes.func.isRequired,
  };
  componentWillMount() {
    //  Get the params in url
    const {
      match: { params },
    } = this.props;
    this.props.getTicket(params.id);
  }
  handleAddReply = (reply) => {
    const {
      match: { params },
    } = this.props;
    const { user } = this.props.auth;
    const status = this.props.ticket.ticket.status;
    this.props.addReply(reply, params.id, user.id, status);
  };
  //  Delete a reply
  handleDelete = (event) => {
    let id = event.target.parentNode.id;

    //  If svg or <th> is clicked, sometimes we dont get id
    //  this fix the bug
    if (!id) {
      id = event.target.id;
    }
    const ticketID = this.props.ticket.ticket._id;
    const answerID = id;
    this.props.deleteReply(ticketID, answerID);
  };
  getUserFromID = (id) => {
    const { users } = this.props.user;
    const filteredUser = users.filter((user) => user._id === id);
    //  If no user has been found, return default
    if (filteredUser.length !== 0) {
      return filteredUser[0].email;
    }
    return 'User not Found';
  };
  handleChangeSelectUser = (event) => {
    console.log('handlechangeqelectuser: ', event.value);
  };
  render() {
    const ticket = this.props.ticket.ticket;
    const { users } = this.props.user;
    const answers = ticket.answers;
    const created_by = this.getUserFromID(ticket.created_by);
    const assigned_to = this.getUserFromID(ticket.assigned_to);
    const loading = this.props.ticket.isLoading;
    console.log('RENDER: ');
    console.log('loading: ', loading);
    return (
      <Container>
        <Card>
          <CardHeader>
            Title: {ticket.title}
            <span>Created_by: {created_by}</span>
            <span>Assigned_to: {assigned_to}</span>
            <span>{new Date(ticket.date).toUTCString()}</span>
            <Badge color='danger'>{ticket.status}</Badge>
          </CardHeader>
          <CardBody>{ticket.description}</CardBody>
        </Card>
        {answers.map((answer) => {
          return (
            <Answer
              getUserFromId={this.getUserFromID}
              answer={answer}
              handleDelete={this.handleDelete}
            />
          );
        })}

        <AddAnswer handleAddReply={this.handleAddReply} />
        {/*
          We render the only if the ticket is loaded
          its doesnt update if the props change :(
        */}
        {!loading ? (
          <SelectSingleUser
            users={users}
            assigned_to={ticket.assigned_to}
            handleChange={this.handleChangeSelectUser}
          />
        ) : (
          ''
        )}
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  isLoading: state.ticket.isLoading,
  project: state.project,
  ticket: state.ticket,
});
export default connect(mapStateToProps, {
  getTicket,
  getUsers,
  addReply,
  deleteReply,
  clearTicket,
})(ViewSingleTicket);
