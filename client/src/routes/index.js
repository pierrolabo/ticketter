import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import PrivateRoute from './PrivateRoute';

import NavBar from '../components/NavBar';
import Index from '../views/Index';
import Home from '../views/Home';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import UserRoles from '../views/UserRoles';

const Routes = (props) => {
  return (
    <div>
      <h1>pass</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

//export default connect(mapStateToProps, null)(Routes)
export default withRouter(connect(mapStateToProps)(Routes));
