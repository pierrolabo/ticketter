import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import NavBar from '../components/NavBar';
import Index from '../views/Index';
import Home from '../views/Home';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import UserRoles from '../views/UserRoles';
import AdminProtected from '../views/AdminProtected.js';

const Routes = (props) => {
  return (
    <div className='router'>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Index} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/Home' auth={props.auth}>
          <Home />
        </PrivateRoute>
        <PrivateRoute path='/users' auth={props.auth}>
          <UserRoles />
        </PrivateRoute>
        <AdminRoute path='/adminroute' auth={props.auth} role={props.auth.role}>
          <AdminProtected />
        </AdminRoute>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Routes);
//export default withRouter(connect(mapStateToProps)(Routes));
