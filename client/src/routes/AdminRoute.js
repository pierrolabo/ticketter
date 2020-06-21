import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, auth, role, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(location) => {
        if (auth.isAuthenticated && role === 'ADMIN') {
          return children;
        } else {
          return <Redirect to='/home' />;
        }
      }}
    />
  );
};

export default PrivateRoute;
