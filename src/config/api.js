export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  ENDPOINTS: {
    LOGIN: '/users/login',
    REFRESH_TOKEN: '/users/refresh-token',
    LOGOUT: '/users/logout',
    PROFILE: '/users/profile',
    SEND_VALIDATION: '/users/send-validation',
    VERIFY_VALIDATION: '/users/verify-validation',
    RESEND_VALIDATION: '/users/resend-validation',
  },
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const getAuthHeader = (token) => ({
  ...API_CONFIG.HEADERS,
  Authorization: `Bearer ${token}`,
});
