import {STORAGE_KEY} from '@/constants/storage-key';

class TokenUtils {
  static getToken(key) {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.localStorage.getItem(key);
  }
  static setToken(key, value) {
    if (typeof window === 'undefined') {
      return null;
    }
    window.localStorage.setItem(key, value);
  }
  static removeToken(key) {
    if (typeof window === 'undefined') {
      return null;
    }
    window.localStorage.removeItem(key);
  }
}

export class AccessTokenUtils extends TokenUtils {
  static getToken() {
    return super.getToken(STORAGE_KEY.AUTH_TOKEN.ACCESS_TOKEN);
  }
  static setToken(value) {
    super.setToken(STORAGE_KEY.AUTH_TOKEN.ACCESS_TOKEN, value);
  }
  static removeToken() {
    super.removeToken(STORAGE_KEY.AUTH_TOKEN.ACCESS_TOKEN);
  }
}

export class RefreshTokenUtils extends TokenUtils {
  static getToken() {
    return super.getToken(STORAGE_KEY.AUTH_TOKEN.REFRESH_TOKEN);
  }
  static setToken(value) {
    super.setToken(STORAGE_KEY.AUTH_TOKEN.REFRESH_TOKEN, value);
  }
  static removeToken() {
    super.removeToken(STORAGE_KEY.AUTH_TOKEN.REFRESH_TOKEN);
  }
}
