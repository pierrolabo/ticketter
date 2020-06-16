import React from 'react';
//  Router
import { Route, Switch } from 'react-router-dom';
import { history } from '../configureStore';
//  Routes
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
//  Redux
import { connect } from 'react-redux';
//  Components
import NavBar from '../components/NavBar';
import SideBar from '../components/sidebar/SideBar';
//  Pages
import Index from '../views/Index';
import Home from '../views/Home';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Users from '../views/Users';
import Tickets from '../views/Tickets';
import CreateTicket from '../views/CreateTicket';
import Projects from '../views/Projects';
import CreateProject from '../views/CreateProject';

const Routes = (props) => {
  const location = history.location;
  return (
    <div className='router'>
      <NavBar />
      <div className='main-container'>
        {props.auth.isAuthenticated && location.pathname !== '/' ? (
          <SideBar role={props.auth.role} />
        ) : (
          ''
        )}

        <Switch>
          <main>
            <Route exact path='/' component={Index} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <PrivateRoute exact path='/home' auth={props.auth}>
              <Home />
            </PrivateRoute>
            <PrivateRoute exact path='/tickets' auth={props.auth}>
              <Tickets />
            </PrivateRoute>
            <AdminRoute path='/users' auth={props.auth} role={props.auth.role}>
              <Users />
            </AdminRoute>
            <AdminRoute
              path='/tickets/create'
              auth={props.auth}
              role={props.auth.role}
            >
              <CreateTicket />
            </AdminRoute>
            <AdminRoute
              path='/projects'
              auth={props.auth}
              role={props.auth.role}
            ></AdminRoute>
            <AdminRoute
              path='/projects/view'
              auth={props.auth}
              role={props.auth.role}
            >
              <Projects />
            </AdminRoute>
            <AdminRoute
              path='/projects/create'
              auth={props.auth}
              role={props.auth.role}
            >
              <CreateProject />
            </AdminRoute>
          </main>
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  router: state.router,
});

export default connect(mapStateToProps, null)(Routes);
//export default withRouter(connect(mapStateToProps)(Routes));
