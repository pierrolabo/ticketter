import React from 'react';
import { Route, Switch } from 'react-router';
import NavBar from '../components/NavBar';
import Home from '../views/Home';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

const routes = (
  <div>
    <NavBar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
    </Switch>
  </div>
);

export default routes;
