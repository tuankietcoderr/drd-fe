import {STORAGE_KEY} from '@/constants/storage-key';
import Cookies from 'js-cookie';

class TokenUtils {
  static getToken(key, useCookies = false) {
    if (typeof window === 'undefined') {
      return null;
    }
    if (useCookies) {
      return Cookies.get(key);
    }
    return window.localStorage.getItem(key);
  }
  static setToken(key, value, useCookies = false) {
    if (typeof window === 'undefined') {
      return null;
    }

    if (useCookies) {
      Cookies.set(key, value, {
        expires: 14,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        path: '/',
      }); // Set cookie expiration to 14 days
      return;
    }

    window.localStorage.setItem(key, value);
  }
  static removeToken(key, useCookies = false) {
    if (typeof window === 'undefined') {
      return null;
    }
    if (useCookies) {
      Cookies.remove(key);
      return;
    }
    window.localStorage.removeItem(key);
  }
}

export class AccessTokenUtils extends TokenUtils {
  static getToken() {
    return super.getToken(STORAGE_KEY.AUTH_TOKEN.ACCESS_TOKEN, true);
  }
  static setToken(value) {
    super.setToken(STORAGE_KEY.AUTH_TOKEN.ACCESS_TOKEN, value, true);
  }
  static removeToken() {
    super.removeToken(STORAGE_KEY.AUTH_TOKEN.ACCESS_TOKEN, true);
  }
}

export class RefreshTokenUtils extends TokenUtils {
  static getToken() {
    return super.getToken(STORAGE_KEY.AUTH_TOKEN.REFRESH_TOKEN, true);
  }
  static setToken(value) {
    super.setToken(STORAGE_KEY.AUTH_TOKEN.REFRESH_TOKEN, value, true);
  }
  static removeToken() {
    super.removeToken(STORAGE_KEY.AUTH_TOKEN.REFRESH_TOKEN, true);
  }
}

export class JobDescriptionSessionIdUtils extends TokenUtils {
  static getToken() {
    return super.getToken(STORAGE_KEY.SESSION.JOB_DESCRIPTION);
  }
  static setToken(value) {
    super.setToken(STORAGE_KEY.SESSION.JOB_DESCRIPTION, value);
  }
  static removeToken() {
    super.removeToken(STORAGE_KEY.SESSION.JOB_DESCRIPTION);
  }
}

export class ChatbotWidgetSessionIdUtils extends TokenUtils {
  static getToken() {
    return super.getToken(STORAGE_KEY.SESSION.CHATBOT_WIDGET);
  }
  static setToken(value) {
    super.setToken(STORAGE_KEY.SESSION.CHATBOT_WIDGET, value);
  }
  static removeToken() {
    super.removeToken(STORAGE_KEY.SESSION.CHATBOT_WIDGET);
  }
}
