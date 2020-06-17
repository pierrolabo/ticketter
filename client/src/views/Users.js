import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getUsers } from '../actions/userActions';
import PropTypes from 'prop-types';

import UserList from '../components/UserList/UserList';

class Users extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const { users } = this.props.user;

    return (
      <div className='users-container'>
        <h1>User Roles</h1>
        <UserList users={users}></UserList>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps, { getUsers })(Users);
