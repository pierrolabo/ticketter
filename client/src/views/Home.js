import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTickets } from '../actions/ticketActions';
import { getProjects } from '../actions/projectActions';
import DashboardAdmin from '../components/admin/DashboardAdmin';

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  commponentDidMount() {
    console.log('MOUNT');
    this.props.getTickets();
    this.props.getProjects();
  }
  render() {
    const { role } = this.props.auth;
    return (
      <div className='home'>
        {role === 'ADMIN' ? <DashboardAdmin /> : '<h1>lol</h1>'}
      </div>
    );
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
