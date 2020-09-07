import Axios from "axios";
import { API, OFF_SERVER } from "../constants";
import { isNetworkError, HandleError } from "../config/util";
import { HTTP_CODE } from "constants/index";
import { CookieService } from "./CookieService";
import { RequestServer, WrapHandleError } from "./RequestServer";
import Auth from "./Auth";

interface Credencial {
  username: string;
  password: string;
}
const expireAt = 60 * 24;
class AuthService {
  static async doLogin(credencial: Credencial) {
    try {
      const response = await Axios.post(API.LOGIN, credencial);
      return response;
    } catch (error) {
      if (!isNetworkError(error)) {
        if (error.response.status === 400) {
          throw WrapHandleError(
            HandleError(
              error.response.status,
              "Usuario o contraseña inválidas",
              error.response.data.error
            ),
            "warning"
          );
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
      throw WrapHandleError(
        HandleError(HTTP_CODE.OFF_SERVER, OFF_SERVER),
        "warning"
      );
    }
  }
  static handleLoginSuccess(response: any, remember: boolean) {
    let options = { SameSite: "Lax", path: "/" };
    if (remember) {
      CookieService.set("access_token", response.access_token, options);
    } else {
      let date = new Date();
      date.setTime(date.getTime() + expireAt * 60 * 1000);
      options["expires"] = date;
      CookieService.set("access_token", response.access_token, options);
    }
  }

  static async logOut() {
    const Logout = () => {
      Auth.logOut(() => {
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      });
    };
    try {
      await RequestServer.GET(API.LOGOUT);
      Logout();
    } catch (error) {
      Logout();
    }
  }
}
export { AuthService };
