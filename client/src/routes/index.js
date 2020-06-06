import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import NavBar from '../components/NavBar';
import SideBar from '../components/sidebar/SideBar';

import Index from '../views/Index';
import Home from '../views/Home';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Users from '../views/Users';
import AdminProtected from '../views/AdminProtected.js';

const Routes = (props) => {
  return (
    <div className='router'>
      <NavBar />
      <div className='main-container'>
        {props.auth.isAuthenticated ? <SideBar /> : ''}

        <Switch>
          <main>
            <Route exact path='/' component={Index} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/home' auth={props.auth}>
              <Home />
            </PrivateRoute>
            <PrivateRoute path='/users' auth={props.auth}>
              <Users />
            </PrivateRoute>
            <AdminRoute
              path='/adminroute'
              auth={props.auth}
              role={props.auth.role}
            >
              <AdminProtected />
            </AdminRoute>
          </main>
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Routes);
//export default withRouter(connect(mapStateToProps)(Routes));
