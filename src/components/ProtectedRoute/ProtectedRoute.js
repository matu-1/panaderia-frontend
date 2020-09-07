import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "service/Auth";
import { ROUTE_PAGE } from "constants/index";

const ProtectedRoute = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(matchProps) =>
        Auth.isAuthenticated() ? (
          <Redirect to={ROUTE_PAGE.LOGIN} />
        ) : (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export { ProtectedRoute };
