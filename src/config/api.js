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

    // NUEVOS ENDPOINTS DE RECUPERACIÓN
    FORGOT_PASSWORD: '/users/forgot-password',
    RESET_PASSWORD: '/users/reset-password',
  },
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};