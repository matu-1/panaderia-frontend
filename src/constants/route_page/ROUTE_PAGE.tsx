const ROUTE_PAGE = {
  LOGIN: "/login",
  HOME: "/",
  INSUMO: {
    LISTAR: '/insumo',
    CREAR: '/insumo/crear',
    EDITAR: '/insumo/editar/:id'
  },
  INVITACION: {
    LISTAR: "/invitacion/listar",
    CREAR: "/invitacion/crear",
    EDITAR: "/invitacion/editar/:id",
    LISTAR_ACTIVIDAD: "/invitacion/actividad/:id",
    CREAR_ACTIVIDAD: "/invitacion/actividad/crear/:id",
    LISTAR_ESTADO: "/invitacion/estado/:id",
    CREAR_ESTADO: "/invitacion/estado/crear/:id",
    EDITAR_ESTADO: "/invitacion/estado/editar/:id",
    LISTAR_ALL: "/invitacion/all",
  },
};

const ROUTE_PARAM = (route, param, baseUrl = "") => {
  //Si el object esta vacio
  let isEmpty = (data) => {
    return Object.keys(data).length === 0;
  };
  //Si es un object
  let isObject = (data) => {
    return typeof data === "object" && data !== null && data !== undefined;
  };
  let copyUrl = route;
  if (isObject(param) && !isEmpty(param)) {
    Object.keys(param).forEach((key) => {
      copyUrl = copyUrl.replace(":" + key, param[key]);
    });
  }
  return baseUrl + copyUrl;
};
export { ROUTE_PAGE, ROUTE_PARAM };
