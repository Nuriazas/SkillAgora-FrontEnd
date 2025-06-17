import { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import ApiService from '../services/api';

const AuthContext = createContext();

// Configuración
const API_URL = 'http://localhost:3000';
const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutos
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_ATTEMPT_WINDOW = 15 * 60 * 1000; // 15 minutos
const VALIDATION_CODE_EXPIRY = 5 * 60 * 1000; // 5 minutos

/**
 * Recupera el usuario desde localStorage de forma segura.
 */
function getStoredUser() {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

/**
 * Recupera la expiración del token desde localStorage.
 */
function getStoredTokenExpiry() {
  const expiry = localStorage.getItem('tokenExpiry');
  return expiry ? Number(expiry) : null;
}

/**
 * Recupera la preferencia de "recordar usuario" desde localStorage.
 */
function getStoredRememberMe() {
  return localStorage.getItem('rememberMe') === 'true';
}

/**
 * Recupera el refresh token desde localStorage.
 */
function getStoredRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(getStoredRefreshToken);
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenExpiry, setTokenExpiry] = useState(getStoredTokenExpiry);
  const [rememberMe, setRememberMe] = useState(getStoredRememberMe);
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [validationCode, setValidationCode] = useState(null);
  const [validationCodeExpiry, setValidationCodeExpiry] = useState(null);

  const logoutTimeoutRef = useRef();
  const refreshTokenIntervalRef = useRef();

  const clearTokens = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setTokenExpiry(null);
    if (!rememberMe) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenExpiry');
    }
  }, [rememberMe]);

  const logout = useCallback(() => {
    setUser(null);
    clearTokens();
    setError('');
    setRememberMe(false);
    clearTimeout(logoutTimeoutRef.current);
    clearInterval(refreshTokenIntervalRef.current);

    // Limpiar localStorage si no se está usando "recordar usuario"
    if (!rememberMe) {
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
    }
  }, [rememberMe, clearTokens]);

  // Limpia los timeouts al desmontar
  useEffect(() => {
    return () => {
      clearTimeout(logoutTimeoutRef.current);
      clearInterval(refreshTokenIntervalRef.current);
    };
  }, []);

  // Maneja la expiración del token
  useEffect(() => {
    clearTimeout(logoutTimeoutRef.current);
    if (!token || !tokenExpiry) return;

    const now = Date.now();
    if (now >= tokenExpiry) {
      if (refreshToken) {
        refreshAccessToken();
      } else {
        logout();
      }
    } else {
      logoutTimeoutRef.current = setTimeout(() => {
        if (refreshToken) {
          refreshAccessToken();
        } else {
          logout();
        }
      }, tokenExpiry - now);
    }
  }, [token, tokenExpiry, refreshToken, logout]);

  // Configura el intervalo de refresh token
  useEffect(() => {
    if (refreshToken) {
      refreshTokenIntervalRef.current = setInterval(refreshAccessToken, TOKEN_REFRESH_INTERVAL);
    }
    return () => clearInterval(refreshTokenIntervalRef.current);
  }, [refreshToken]);

  // Sincroniza token con localStorage
  useEffect(() => {
    if (token && rememberMe) {
      localStorage.setItem('token', token);
    } else if (!rememberMe) {
      localStorage.removeItem('token');
    }
  }, [token, rememberMe]);

  // Sincroniza refresh token con localStorage
  useEffect(() => {
    if (refreshToken && rememberMe) {
      localStorage.setItem('refreshToken', refreshToken);
    } else if (!rememberMe) {
      localStorage.removeItem('refreshToken');
    }
  }, [refreshToken, rememberMe]);

  // Sincroniza usuario con localStorage
  useEffect(() => {
    if (user && rememberMe) {
      localStorage.setItem('user', JSON.stringify(user));
    } else if (!rememberMe) {
      localStorage.removeItem('user');
    }
  }, [user, rememberMe]);

  // Sincroniza expiración del token con localStorage
  useEffect(() => {
    if (tokenExpiry && rememberMe) {
      localStorage.setItem('tokenExpiry', tokenExpiry.toString());
    } else if (!rememberMe) {
      localStorage.removeItem('tokenExpiry');
    }
  }, [tokenExpiry, rememberMe]);

  // Sincroniza preferencia de "recordar usuario"
  useEffect(() => {
    localStorage.setItem('rememberMe', rememberMe.toString());
  }, [rememberMe]);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return;

    try {
      const data = await ApiService.refreshToken(refreshToken);
      setToken(data.token);
      setTokenExpiry(Date.now() + data.expiresIn * 1000);
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
  }, [refreshToken, logout]);

  const login = useCallback((userData, userToken, refreshTokenValue, expiresInMs) => {
    setUser(userData);
    setToken(userToken);
    setRefreshToken(refreshTokenValue);
    if (expiresInMs) {
      setTokenExpiry(Date.now() + expiresInMs);
    } else {
      setTokenExpiry(null);
    }
    setError('');
  }, []);

  const checkLoginAttempts = useCallback(() => {
    const now = Date.now();
    const recentAttempts = loginAttempts.filter((attempt) => now - attempt < LOGIN_ATTEMPT_WINDOW);
    setLoginAttempts(recentAttempts);
    return recentAttempts.length >= MAX_LOGIN_ATTEMPTS;
  }, [loginAttempts]);

  const loginWithApi = useCallback(
    async (email, password, shouldRememberMe = false) => {
      setLoading(true);
      setError('');
      setRememberMe(shouldRememberMe);

      if (checkLoginAttempts()) {
        setError('Demasiados intentos fallidos. Por favor, intente más tarde.');
        setLoading(false);
        return { success: false, error: 'rate_limited' };
      }

      try {
        const data = await ApiService.login(email, password);

        login(
          data.user,
          data.token,
          data.refreshToken,
          data.expiresIn * 1000 // Convertir a milisegundos
        );

        setLoginAttempts([]); // Resetear intentos después de login exitoso
        return { success: true };
      } catch (error) {
        console.error('Error en login:', error);
        setLoginAttempts((prev) => [...prev, Date.now()]);
        setError(error.message);
        return { success: false, error: error.message };
      } finally {
        setLoading(false);
      }
    },
    [login, checkLoginAttempts]
  );

  const logoutWithApi = useCallback(async () => {
    if (token) {
      try {
        await ApiService.logout(token);
      } catch (error) {
        console.error('Error en logout:', error);
      }
    }
    logout();
  }, [token, logout]);

  // Función para limpiar errores
  const clearError = useCallback(() => {
    setError('');
  }, []);

  const sendValidationCode = useCallback(async (email) => {
    try {
      setLoading(true);
      setError('');
      // Simulamos una respuesta exitosa
      console.log('Enviando código a:', email);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulamos delay
      setValidationCode('123456');
      setValidationCodeExpiry(Date.now() + VALIDATION_CODE_EXPIRY);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyValidationCode = useCallback(async (email, code) => {
    try {
      setLoading(true);
      setError('');
      // Simulamos una respuesta exitosa
      console.log('Verificando código:', code, 'para email:', email);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulamos delay
      setValidationCode(null);
      setValidationCodeExpiry(null);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const resendValidationCode = useCallback(
    async (email) => {
      return sendValidationCode(email);
    },
    [sendValidationCode]
  );

  const value = {
    token,
    user,
    loading,
    error,
    login,
    loginWithApi,
    logout,
    logoutWithApi,
    clearError,
    isAuthenticated: !!token,
    rememberMe,
    setRememberMe,
    sendValidationCode,
    verifyValidationCode,
    resendValidationCode,
    validationCode,
    validationCodeExpiry,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
