import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { getTickets } from '../../actions/ticketActions';

import TicketCard from '../TicketsCards/TicketCard';
//import ChartComponent from '../chart/ChartComponent';

export class DashboardAdmin extends Component {
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
  ticket: state.ticket,
});
export default connect(mapStateToProps, { getTickets })(DashboardAdmin);
