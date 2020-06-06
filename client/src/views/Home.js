import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../configureStore';

import Sidebar from '../components/sidebar/SideBar';

import DashboardAdmin from '../components/admin/DashboardAdmin';
class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    redirectUnauthenticated: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, role, user } = this.props.auth;
    console.log('user: ', user, 'role: ', role);
    return (
      <div className='home'>
        {role === 'USER' ? <DashboardAdmin /> : '<h1>lol</h1>'}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Home);
