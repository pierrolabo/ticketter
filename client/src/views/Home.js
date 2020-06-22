import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTickets } from '../actions/ticketActions';
import { getProjects } from '../actions/projectActions';
import HomeTicketsCards from '../components/admin/HomeTicketsCards';
import './css/Index.css';

class Home extends Component {
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
export default connect(mapStateToProps, { getTickets, getProjects })(Home);
