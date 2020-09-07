const HOST = process.env.REACT_APP_URL_BASE;
const API = {
  LOGIN: HOST + "/login",
  LOGOUT: HOST + "/logout",
  INFOPERSONAL: HOST + "/persona/informacion",
  INSUMO: {
    LISTAR: HOST + "/insumo",
    EDIT: HOST + "/insumo/:id",
  },
  UNIDAD_MEDIDA: {
    LISTAR: HOST + "/unidad",
    EDIT: HOST + "/unidad/:id",
  },
  PERSONA: {
    LISTAR: HOST + "/person",
    EDIT: HOST + "/person/:id",
    LISTAR_ACTIVO: HOST + "/lista/person_active",
    LISTAR_SIN_ESTADO: HOST + "/lista/personas_nuevas",
    PADRE: HOST + "/lista/person_padre/:id",
    LISTA_SIN_ESTADO_PADRE: HOST + "/lista/personas_nuevas/:id",
  },
  DETALLE_ACTIVIDAD: {
    EDIT: HOST + "/detalle_actividad/:id",
    LISTAR: HOST + "/detalle_actividad",
    LISTAR_ASISTIDOS: HOST + "/lista/personas_asistidos/:id",
  },
};
export { API, HOST };
