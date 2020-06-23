import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { getTickets } from '../../actions/ticketActions';

import TicketCard from '../TicketsCards/TicketCard';
//import ChartComponent from '../chart/ChartComponent';

export class HomeTicketsCards extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    ticket: PropTypes.object.isRequired,
    getTickets: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getTickets();
  }
  render() {
    let newTicket = {
      ticketNumber: 0,
      ticketType: 'NEW',
    };
    let progressTicket = {
      ticketNumber: 50,
      ticketType: 'PROGRESS',
    };
    let urgentTicket = {
      ticketNumber: 25,
      ticketType: 'URGENT',
    };
    let unresolvedTicket = {
      ticketNumber: 5,
      ticketType: 'UNRESOLVED',
    };
    const { tickets } = this.props.ticket;
    if (tickets) {
      newTicket.ticketNumber = tickets.filter(
        (ticket) => ticket.status === 'NEW'
      ).length;
      progressTicket.ticketNumber = tickets.filter(
        (ticket) => ticket.status === 'PROGRESS'
      ).length;
      urgentTicket.ticketNumber = tickets.filter(
        (ticket) => ticket.status === 'URGENT'
      ).length;
      unresolvedTicket.ticketNumber = tickets.filter((ticket) => {
        return ticket.status !== 'UNRESOLVED';
      }).length;
    }
    const noProjectForUser = this.props.project.projects.length > 0;
    return (
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
        <Row className='sorry-no-projects'>
          {!noProjectForUser ? (
            <Container>
              <Jumbotron fluid>
                <Container fluid>
                  <p className='lead text-center'>
                    You have no project assigned :( Contact your administrator
                    to be part of a project
                  </p>
                </Container>
              </Jumbotron>
            </Container>
          ) : (
            ''
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  ticket: state.ticket,
  project: state.project,
});
export default connect(mapStateToProps, { getTickets })(HomeTicketsCards);