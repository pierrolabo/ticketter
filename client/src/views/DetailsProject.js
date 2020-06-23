import React, { Component } from 'react';
import { Container, Card, CardHeader, CardBody, Col, Row } from 'reactstrap';
//  Redux
import { connect } from 'react-redux';
import { deleteTicket } from '../actions/ticketActions';
//Components
import TicketSingleUser from '../components/TicketList/TicketListSingleProject';
import UserListSingleProject from '../components/UserList/UserListSingleProject';

class DetailsProject extends Component {
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
    this.props.deleteTicket(id, projectID._id);
  };
  render() {
    //  Get the params in url
    const {
      match: { params },
    } = this.props;
    const { projects } = this.props.project;
    const { tickets } = this.props.ticket;
    const { users } = this.props.user;
    const { role } = this.props.auth;
    const project = projects.filter((project) => project._id === params.id)[0];
    const filteredTickets = tickets.filter(
      (ticket) => ticket.projectID === project._id
    );
    const filteredUsers = users.filter((user) =>
      project.userList.includes(user._id)
    );
    return (
      <Row className='detailsproject-container'>
        <Col xs='8'>
          <Container xs='8'>
            <Card>
              <CardHeader className='text-center'>{project.name}</CardHeader>
              <CardBody>{project.description}</CardBody>
            </Card>
            <TicketSingleUser
              tickets={filteredTickets}
              users={users}
              role={role}
              handleDelete={this.handleDelete}
            />
          </Container>
        </Col>
        <Col className='detailsproject-options-container' md='1' xl='4'>
          <Row>
            {filteredUsers.map((user, i) => {
              return <UserListSingleProject user={user} index={i} />;
            })}
          </Row>
        </Col>
      </Row>
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
export default connect(mapStateToProps, { deleteTicket })(DetailsProject);
