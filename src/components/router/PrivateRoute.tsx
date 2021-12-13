import { ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

// create PrivateRoute component that gets component as parameter in typescript
const PrivateRoute = ({
  component: Component,
  ...rest
}: RouteProps): ReactElement => {
  // check if user is logged in
  const isLoggedIn = localStorage.getItem('accessToken');
  // if user is logged in, return component
  if (isLoggedIn) {
    return <Route {...rest} component={Component} />;
  }
  // if user is not logged in, redirect to login page
  return <Redirect exact to="/login" />;
};

export default PrivateRoute;
