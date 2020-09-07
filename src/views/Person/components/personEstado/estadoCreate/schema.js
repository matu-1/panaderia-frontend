import { V_REQUIRED } from "constants/index";

const schema = {
  estado: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  descripcion: {
    length: {
      maximum: 128,
    },
  },
};
export { schema };