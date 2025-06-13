import jwtDecode from 'jwt-decode';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
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