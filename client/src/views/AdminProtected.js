import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../configureStore';
import UserList from '../components/UserList/UserList';
import Sidebar from '../components/sidebar/SideBar';

class AdminProtected extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, role, user } = this.props.auth;
    const users = [
      {
        name: 'joseph',
        lastName: 'stalin',
        role: 'user',
      },
      {
        name: 'miguel',
        lastName: 'Sanchez',
        role: 'admin',
      },
      {
        name: 'alberto',
        lastName: 'josé',
        role: 'pg',
      },
    ];
    return (
      <div className='home'>
        <Sidebar />
        <h1>ADMIN ROUTE</h1>
        <h1>User Roles</h1>
        <UserList users={users}></UserList>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(AdminProtected);
