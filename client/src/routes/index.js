import React from 'react';
import { Route, Switch } from 'react-router';
import NavBar from '../components/NavBar';
import Index from '../views/Index';
import Home from '../views/Home';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
const routes = (
  <div>
    <NavBar />
    <sideBar />
    <Switch>
      <Route exact path='/' component={Index} />
      <Route path='/register' component={Register} />
      <Route path='/Home' component={Home} />
      <Route path='/login' component={Login} />
    </Switch>
  </div>
);

export default routes;
