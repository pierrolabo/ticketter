import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from 'reactstrap';
import TicketList from '../components/TicketList/TicketList';

export class Tickets extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    return (
      <Container className='tickets-container'>
        <TicketList />
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Tickets);
