import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, CardHeader, CardBody, Badge } from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../actions/userActions';
import { getTicket } from '../actions/ticketActions';
import { addReply } from '../actions/ticketActions';
import { deleteReply } from '../actions/ticketActions';
import { Answer } from '../components/Answer/Answer';
import { AddAnswer } from '../components/Answer/AddAnswer';
class ViewSingleTicket extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getTicket: PropTypes.func.isRequired,
  };
  componentWillMount() {
    //  Get the params in url
    const {
      match: { params },
    } = this.props;
    this.props.getTicket(params.id);
    this.props.getUsers();
  }
  handleAddReply = (reply) => {
    const {
      match: { params },
    } = this.props;
    this.props.addReply(reply, params.id);
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
  render() {
    const ticket = this.props.ticket.ticket;
    const answers = ticket.answers;
    return (
      <Container>
        <Card>
          <CardHeader>
            Title: {ticket.title}
            <Badge color='danger'>{ticket.status}</Badge>
          </CardHeader>
          <CardBody>{ticket.description}</CardBody>
        </Card>
        {answers.map((answer) => {
          return <Answer answer={answer} handleDelete={this.handleDelete} />;
        })}

        <AddAnswer handleAddReply={this.handleAddReply} />
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
})(ViewSingleTicket);
