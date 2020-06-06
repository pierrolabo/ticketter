import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../configureStore';
import UserList from '../components/UserList/UserList';
import Sidebar from '../components/sidebar/SideBar';

class UserRoles extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    redirectUnauthenticated: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('auth:', this.props.auth.isAuthenticated);
    if (
      this.props.auth.isAuthenticated !== null &&
      !this.props.auth.isAuthenticated
    ) {
      history.push('/');
    }
  }
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
        <h1>User Roles</h1>
        <UserList users={users}></UserList>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(UserRoles);
