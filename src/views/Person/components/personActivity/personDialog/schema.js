import { V_REQUIRED } from "constants/index";

const schema = {
  descripcion: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 100,
    },
  },
  asistio: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};
export { schema };