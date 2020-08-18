import {getCookie, setCookie} from "../../cookie"

const AUTHENTICATION_STORAGE_KEY = "token";

export function getAuthenticationToken() {
  return getCookie(AUTHENTICATION_STORAGE_KEY);
}

export async function setAuthenticationToken(token) {
  return setCookie(AUTHENTICATION_STORAGE_KEY, token);
}

export async function clearAuthenticationToken() {
  return setCookie(AUTHENTICATION_STORAGE_KEY, null);
}
