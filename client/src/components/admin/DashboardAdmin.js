import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Row, Col, NavLink, Nav } from 'reactstrap';
import Sidebar from '../sidebar/SideBar';
import TicketCard from '../TicketsCards/TicketCard';

export class DashboardAdmin extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { isAuthenticated, role, user } = this.props.auth;
    const newTicket = {
      ticketNumber: 25,
      ticketType: 'NEW',
    };
    const progressTicket = {
      ticketNumber: 50,
      ticketType: 'PROGRESS',
    };
    const urgentTicket = {
      ticketNumber: 25,
      ticketType: 'URGENT',
    };
    const unresolvedTicket = {
      ticketNumber: 5,
      ticketType: 'UNRESOLVED',
    };
    return (
      <Container>
        <Container className='dashboard'>
          <Row>
            <Col>
              <TicketCard ticketInfo={newTicket} />
            </Col>
            <Col>
              <TicketCard ticketInfo={progressTicket} />
            </Col>
            <Col>
              <TicketCard ticketInfo={urgentTicket} />
            </Col>
            <Col>
              <TicketCard ticketInfo={unresolvedTicket} />
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(DashboardAdmin);
