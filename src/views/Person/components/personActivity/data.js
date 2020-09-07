import uuid from 'uuid/v1';

export const actividadesPersonaData = [
  {
    id: uuid(),
    asistio: 'si',
    descripcion: 'En la entrevista se le vio desanimado :(',
    actividad: {
      id: uuid(),
      fecha_hr: "2020-07-27T02:37:16.000000Z",
      titulo: 'Bienvenida',
      tipo_actividad: {
        id: 1,
        tipo: 'entrevista',
      },
      created_at: "2020-07-27T02:37:16.000000Z",
    },
    id_act: uuid(),
    id_per: uuid(),
    created_at: "2020-07-27T02:37:16.000000Z",
  },
  {
    id: uuid(),
    asistio: null,
    descripcion: null,
    id_act: uuid(),
    id_per: uuid(),
    actividad:   {
      id: uuid(),
      fecha_hr: "2020-07-27T02:37:16.000000Z",
      titulo: 'Actividad 2',
      tipo_actividad: {
        id: 1,
        tipo: 'entrevista',
      },
      created_at: "2020-07-27T02:37:16.000000Z",
    },
    created_at: "2020-07-27T02:37:16.000000Z",
  },
  {
    id: uuid(),
    asistio: null,
    descripcion: null,
    actividad:  {
      id: uuid(),
      fecha_hr: "2020-07-27T02:37:16.000000Z",
      titulo: 'Actividad 2',
      tipo_actividad: {
        id: 1,
        tipo: 'entrevista',
      },
      created_at: "2020-07-27T02:37:16.000000Z",
    },
    id_act: uuid(),
    id_per: uuid(),
    created_at: "2020-07-27T02:37:16.000000Z",
  },
]
