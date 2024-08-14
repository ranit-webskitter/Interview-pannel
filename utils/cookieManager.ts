import { destroyCookie, parseCookies, setCookie } from "nookies";

class CookieManager {
  static get(key: string): string | undefined {
    const cookies = parseCookies();
    return cookies[key];
  }
  static set(key: string, value: string) {
    setCookie(null, key, value, { path: "/" });
  }
  static remove(key: string) {
    destroyCookie(null, key, { path: "/" });
  }
}
export default CookieManager;
