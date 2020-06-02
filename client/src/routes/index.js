import React from 'react';
import { Route, Switch } from 'react-router';
import Register from '../components/auth/Register';

const routes = (
  <div>
    <Switch>
      <Route exact path='/' component={Register} />
    </Switch>
  </div>
);

export default routes;
