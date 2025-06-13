export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  ENDPOINTS: {
    LOGIN: '/users/login',
    REFRESH_TOKEN: '/users/refresh-token',
    LOGOUT: '/users/logout',
    PROFILE: '/users/profile',
    SEND_VALIDATION: '/api/auth/send-validation',
    VERIFY_VALIDATION: '/api/auth/verify-validation',
    RESEND_VALIDATION: '/api/auth/resend-validation',
  },
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export const getAuthHeader = (token) => ({
  ...API_CONFIG.HEADERS,
  Authorization: `Bearer ${token}`,
});
