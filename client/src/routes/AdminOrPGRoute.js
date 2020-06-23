import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminOrPGRoute = ({ children, auth, role, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(location) => {
        if (
          (auth.isAuthenticated && role === 'ADMIN') ||
          role === 'PROJECT_MANAGER'
        ) {
          return children;
        } else {
          return <Redirect to='/home' />;
        }
      }}
    />
  );
};

export default AdminOrPGRoute;
