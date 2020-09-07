import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { ROUTE_PAGE } from "constants/index";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ShopIcon from '@material-ui/icons/Shop';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
  InsumoView,
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
import { InsumoCreateView, InsumoEditView } from "views/insumo/components";

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
        href: ROUTE_PAGE.INSUMO.LISTAR,
        icon: <AccountBoxIcon />,
        component: InsumoView,
        route: [

        ],
      },
      {
        title: "Insumo",
        href: ROUTE_PAGE.INSUMO.LISTAR,
        icon: <AccountBoxIcon />,
        component: InsumoView,
        route: [
          {
            href: ROUTE_PAGE.INSUMO.CREAR,
            component: InsumoCreateView,
          },
          {
            href: ROUTE_PAGE.INSUMO.EDITAR,
            component: InsumoEditView,
          },
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
        href: ROUTE_PAGE.INSUMO.LISTAR,
        icon: <AssignmentIndIcon />,
        component: InsumoView,
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
