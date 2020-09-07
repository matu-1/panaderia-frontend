import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { ProtectedRoute, RouteWithLayout } from "components";

import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import {
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Dashboard as DashboardView,
} from "./views";

import { pages } from "rutas";
function getRoute() {
  let router = [];
  pages.forEach((menu) => {
    if (menu.children != null) {
      menu.children.forEach((r, index) => {
        router.push(
          <ProtectedRoute
            key={index + "as"}
            component={r.component}
            exact
            layout={MainLayout}
            path={r.href}
          />
        );
        if (r.route != null) {
          r.route.forEach((rc, index) => {
            router.push(
              <ProtectedRoute
                key={index + "cssa"}
                component={rc.component}
                exact
                layout={MainLayout}
                path={rc.href}
              />
            );
          });
        }
      });
    }
  });
  return router;
}

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/"
      />
      {getRoute()}
      {/* <ProtectedRoute
        component={PersonView}
        exact
        layout={MainLayout}
        path={ROUTE_PAGE.INVITACION.LISTAR}
      />
      <ProtectedRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/home"
      />
      <ProtectedRoute
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <ProtectedRoute
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <ProtectedRoute
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <ProtectedRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <ProtectedRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      /> */}
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
