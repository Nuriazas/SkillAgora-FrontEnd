import { API_CONFIG, getAuthHeader } from '../config/api';

class ApiService {
  static async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...API_CONFIG.HEADERS,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la petición');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error;
    }
  }

  static async login(email, password) {
    return this.request(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  static async refreshToken(token) {
    return this.request(API_CONFIG.ENDPOINTS.REFRESH_TOKEN, {
      method: 'POST',
      headers: getAuthHeader(token),
    });
  }

  static async logout(token) {
    return this.request(API_CONFIG.ENDPOINTS.LOGOUT, {
      method: 'POST',
      headers: getAuthHeader(token),
    });
  }

  static async getProfile(token) {
    return this.request(API_CONFIG.ENDPOINTS.PROFILE, {
      method: 'GET',
      headers: getAuthHeader(token),
    });
  }

  static async sendValidationCode(email) {
    return this.request(API_CONFIG.ENDPOINTS.SEND_VALIDATION, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  static async verifyValidationCode(email, code) {
    return this.request(API_CONFIG.ENDPOINTS.VERIFY_VALIDATION, {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  }

  static async resendValidationCode(email) {
    return this.request(API_CONFIG.ENDPOINTS.RESEND_VALIDATION, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
}

export default ApiService;
