import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, auth, ...rest }) => {
  console.log('routeauth: ', auth);
  /*
  return (
    <Route
      {...rest}
      render={(location) =>
        auth.isAuthenticated ? <children /> : <Redirect to='/login' />
      }
    />
  );
  */
};

export default PrivateRoute;
