import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, auth, role, ...rest }) => {
  console.log('==== adminRoute: ', role);
  console.log('==== adminRoute: ', auth);

  return (
    <Route
      {...rest}
      render={(location) => {
        if (auth.isAuthenticated && role == 'ADMIN') {
          return children;
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  );
};

export default PrivateRoute;
