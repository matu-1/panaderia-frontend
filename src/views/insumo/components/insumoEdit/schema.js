import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  nombre: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 200,
    },
  },
  costo: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 5,
    },
  },
  stock: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 5,
    },
  },
  stock_minimo: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 5,
    },
  },
  stock_maximo: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 5,
    },
  },
};
export { schema };
