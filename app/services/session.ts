/**
 * @file contains auth utils like get token, set token etc.
 */
import * as Cookies from 'js-cookie';

/** Get user token from the cookies */
export const getToken = (): string | undefined => Cookies.get(process.env.SESSION_COOKIE_NAME || 'token');

export default {
  getToken,
};
