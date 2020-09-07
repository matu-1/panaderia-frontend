import Cookies from "js-cookie";
export class CookieService {
  static get(key: string) {
    return Cookies.get(key);
  }

  static set(key: string, value: string, options: Object) {
    Cookies.set(key, value, options);
  }

  static remove(key: string) {
    Cookies.remove(key);
  }
}
