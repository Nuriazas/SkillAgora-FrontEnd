import { jwtDecode } from 'jwt-decode';

// Función auxiliar para obtener una cookie por nombre
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Función auxiliar para establecer una cookie
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

// Función auxiliar para eliminar una cookie
const removeCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const getToken = () => {
  return getCookie('token');
};

export const setToken = (token) => {
  setCookie('token', token, 7); // Cookie expira en 7 días
};

export const removeToken = () => {
  removeCookie('token');
};

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const getTokenExpiration = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000; // Convertir a milisegundos
  } catch {
    return null;
  }
};

export const getTokenData = (token) => {
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}; 