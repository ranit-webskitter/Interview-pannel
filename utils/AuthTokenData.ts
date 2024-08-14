import CookieManager from "./cookieManager";

class AuthTokenData {
  static key = "auth_token";
  static path = "/";
  static get = (): string | undefined => {
    return CookieManager.get(AuthTokenData.key);
  };
  static set = (token: string) => {
    CookieManager.set(AuthTokenData.key, token);
  };
  static remove = () => {
    CookieManager.remove(AuthTokenData.key);
  };
}
export default AuthTokenData;
