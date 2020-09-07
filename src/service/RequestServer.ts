import Axios from "axios";
import { isNetworkError, HandleError } from "../config/util";
import { HTTP_CODE, OFF_SERVER } from "constants/index";
import { CookieService } from "./CookieService";
import Auth from "./Auth";

export function WrapHandleError(props, type) {
  return { ...props, type };
}
const CONFIG_REQUEST = () => ({
  withCredentials: true,
  headers: { Authorization: `Bearer ${CookieService.get("access_token")}` },
});
const verifyError = (error) => {
  if (!isNetworkError(error)) {
    if (error.response.status === 401) {
      Auth.logOut(() => {
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      });
    }
    throw WrapHandleError(
      HandleError(
        error.response.status,
        error.response.data.message,
        error.response.data.error
      ),
      "error"
    );
  }
};
export class RequestServer {
  static async ALL(requests: RequestServer[]) {
    try {
      return await Axios.all(requests);
    } catch (error) {
      throw { ...error };
    }
  }
  static async POST(url: string, data: object, config = CONFIG_REQUEST()) {
    try {
      return await Axios.post(url, data, config);
    } catch (error) {
      verifyError(error);
      throw WrapHandleError(
        HandleError(HTTP_CODE.OFF_SERVER, OFF_SERVER),
        "warning"
      );
    }
  }

  static async GET(url: string, config = CONFIG_REQUEST()) {
    try {
      return await Axios.get(url, config);
    } catch (error) {
      verifyError(error);
      throw WrapHandleError(
        HandleError(HTTP_CODE.OFF_SERVER, OFF_SERVER),
        "warning"
      );
    }
  }

  static async PUT(url: string, data: object, config = CONFIG_REQUEST()) {
    try {
      return await Axios.put(url, data, config);
    } catch (error) {
      verifyError(error);
      throw WrapHandleError(
        HandleError(HTTP_CODE.OFF_SERVER, OFF_SERVER),
        "warning"
      );
    }
  }

  static async DELETE(url: string, config = CONFIG_REQUEST()) {
    try {
      return await Axios.delete(url, config);
    } catch (error) {
      verifyError(error);
      throw WrapHandleError(
        HandleError(HTTP_CODE.OFF_SERVER, OFF_SERVER),
        "warning"
      );
    }
  }

  static async PATCH(url: string, data: object, config = CONFIG_REQUEST()) {
    try {
      return await Axios.patch(url, data, config);
    } catch (error) {
      verifyError(error);
      throw WrapHandleError(
        HandleError(HTTP_CODE.OFF_SERVER, OFF_SERVER),
        "warning"
      );
    }
  }
}
