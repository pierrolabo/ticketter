import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, auth, ...rest }) => {
  console.log('auth', auth);
  return (
    <Route
      {...rest}
      render={(location) => {
        if (auth.isAuthenticated) {
          return children;
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  );
};

export default PrivateRoute;
