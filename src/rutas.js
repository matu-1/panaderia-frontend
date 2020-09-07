import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { ROUTE_PAGE } from "constants/index";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ShopIcon from '@material-ui/icons/Shop';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
  Person as PersonView,
  /*Dashboard as DashboardView,
  ProductList as ProductListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView, */
} from "./views";

export const pages = [
  {
    title: "Dashboard",
    href: "/home",
    icon: <DashboardIcon />,
  },
  {
    title: "Produccion",
    icon: <ShopIcon />,
    children: [
      {
        title: "Ficha produccion",
        href: ROUTE_PAGE.INVITACION.LISTAR,
        icon: <AccountBoxIcon />,
        component: PersonView,
        route: [

        ],
      },
    ],
  },
  {
    title: "Compra",
    icon: <ShoppingCartIcon />,
    children: [
      {
        title: "Proveedor",
        href: ROUTE_PAGE.INVITACION.LISTAR,
        icon: <AssignmentIndIcon />,
        component: PersonView,
        route: [
          // {
          //   href: ROUTE_PAGE.ORGANIZACION.LISTAR_INVITADO,
          //   component: StartupInvitado,
          // },
        ],
      },
    ],
  },
];
