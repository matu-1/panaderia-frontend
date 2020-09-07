import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  ci: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 20,
    },
  },
  nombre: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 200,
    },
  },
  apellido: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 200,
    },
  },
  edad: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 2,
    },
  },
};
export { schema };
