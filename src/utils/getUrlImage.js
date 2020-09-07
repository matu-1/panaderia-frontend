import { HOST } from "constants/index";

  export const getUrlImage = (foto) => {
    return `${HOST.substring(0, HOST.length - 4)}/${foto}`;
  }