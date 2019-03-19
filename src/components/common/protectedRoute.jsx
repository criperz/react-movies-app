import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
