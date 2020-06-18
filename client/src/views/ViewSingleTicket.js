import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Col,
  Row,
  Button,
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../actions/userActions';
import { getTicket } from '../actions/ticketActions';
import { addReply } from '../actions/ticketActions';
import { clearTicket } from '../actions/ticketActions';
import { deleteReply } from '../actions/ticketActions';
import { setCompletedTicket } from '../actions/ticketActions';
import { setAssignedTo } from '../actions/ticketActions';
import { Answer } from '../components/Answer/Answer';
import { AddAnswer } from '../components/Answer/AddAnswer';
import SelectSingleUser from '../components/Select/SelectSingleUser';

class ViewSingleTicket extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getTicket: PropTypes.func.isRequired,
    clearTicket: PropTypes.func.isRequired,
    setCompletedTicket: PropTypes.func.isRequired,
  };
  state = {
    nextAssignedUser: null,
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
    this.setState({
      nextAssignedUser: event.value,
    });
  };
  handleSaveSelectUser = () => {
    const ticketID = this.props.ticket.ticket._id;
    const userID = this.state.nextAssignedUser;
    this.props.setAssignedTo(ticketID, userID);
    this.setState({
      nextAssignedUser: null,
    });
  };
  handleMarkAsCompleted = () => {
    const ticketID = this.props.ticket.ticket._id;
    const { user } = this.props.auth;
    this.props.setCompletedTicket(ticketID, user.id);
  };
  render() {
    const ticket = this.props.ticket.ticket;
    const { users } = this.props.user;
    const answers = ticket.answers;
    const created_by = this.getUserFromID(ticket.created_by);
    const assigned_to = this.getUserFromID(ticket.assigned_to);
    const loading = this.props.ticket.isLoading;
    return (
      <Container className='viewsingleticket-container'>
        <Row>
          <Col>
            <Container className='viewsingleticket-display-ticket'>
              <Card>
                <CardHeader>
                  <Row>
                    <Col className='text-center'>{ticket.title}</Col>
                  </Row>
                </CardHeader>
                <CardHeader>
                  <Container className='themed-container'>
                    <Row>
                      <Col>
                        <span>Created_by: {created_by}</span>
                      </Col>
                      <Col>
                        <span>Assigned_to: {assigned_to}</span>
                      </Col>
                      <Col>
                        <span>{new Date(ticket.date).toUTCString()}</span>
                      </Col>
                      {ticket.isCompleted ? (
                        <Col xs='1' sm='3' md='2'>
                          <Badge color='danger'>Completed</Badge>
                        </Col>
                      ) : (
                        <Col xs='1' sm='3' md='2'>
                          <Badge color='danger'>{ticket.status}</Badge>
                        </Col>
                      )}
                    </Row>
                  </Container>
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
            </Container>
          </Col>
          <Col xs='1' sm='3'>
            <Container className='viewsingleticketcontainer-optionsContainer'>
              {ticket.isCompleted ? (
                ''
              ) : (
                <Button color='danger' onClick={this.handleMarkAsCompleted}>
                  Mark as Completed
                </Button>
              )}
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
              {this.state.nextAssignedUser ? (
                <Button color='success' onClick={this.handleSaveSelectUser}>
                  Reassign
                </Button>
              ) : (
                ''
              )}
            </Container>
          </Col>
        </Row>
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
  setCompletedTicket,
  setAssignedTo,
})(ViewSingleTicket);
