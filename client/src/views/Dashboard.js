import React, { Component } from 'react';
//  Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjects } from '../actions/projectActions';
import { getTickets } from '../actions/ticketActions';

import HomeTicketsCards from '../components/TicketsCard/HomeTicketsCards';

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  commponentDidMount() {
    this.props.getTickets();
    this.props.getProjects();
  }
  render() {
    return <HomeTicketsCards />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  router: state.router,
  isLoading: state.ticket.isLoading,
  project: state.project,
  ticket: state.ticket,
});
export default connect(mapStateToProps, { getTickets, getProjects })(Dashboard);
