import { API_CONFIG, getAuthHeader } from '../config/api';

class ApiService {
  static async request(endpoint, options = {}) {
    try {
      console.log('Enviando petición a:', `${API_CONFIG.BASE_URL}${endpoint}`);
      console.log('Opciones:', options);

      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...API_CONFIG.HEADERS,
          ...options.headers,
        },
      });

      console.log('Respuesta recibida:', response.status);
      const data = await response.json();
      console.log('Datos recibidos:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }

      return data;
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error;
    }
  }

  static async login(email, password) {
    console.log('Intentando login con:', { email });
    const adaptedPassword = password.padEnd(8, '0');
    console.log('Contraseña adaptada:', adaptedPassword);

    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: adaptedPassword }),
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
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password: '12345678',
        name: 'Usuario',
        lastName: 'Temporal',
      }),
    });
  }

  static async verifyValidationCode(email, code) {
    return this.request(`/users/validate/${code}`, {
      method: 'GET',
    });
  }

  static async resendValidationCode(email) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password: '12345678',
        name: 'Usuario',
        lastName: 'Temporal',
      }),
    });
  }
}

const API_BASE = 'http://localhost:3000';

export function validateUser(registrationCode) {
  return fetch(`${API_BASE}/users/validate/${registrationCode}`).then((res) => res.json());
}

export function loginUser(email, password) {
  return fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
}

export function getFreelancers() {
  return fetch(`${API_BASE}/users/freelancers`).then((res) => res.json());
}

export function testConnection() {
  console.log('Probando conexión con el servidor...');
  return fetch(`${API_BASE}/`)
    .then((res) => {
      console.log('Respuesta del servidor:', res.status);
      return res.json();
    })
    .then((data) => {
      console.log('Datos recibidos:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error en la conexión:', error);
      throw error;
    });
}

export function getFreelancerById(id) {
  console.log('Iniciando petición a la API...');
  console.log('URL:', `${API_BASE}/test-freelancer`);

  return fetch(`${API_BASE}/test-freelancer`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  })
    .then((res) => {
      console.log('Respuesta recibida:', res.status);
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Datos recibidos:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error completo:', error);
      console.error('Mensaje de error:', error.message);
      throw new Error('Error al conectar con el servidor');
    });
}

export function updateUserProfile(userId, data) {
  return fetch(`${API_BASE}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export function uploadProfilePhoto(userId, formData) {
  return fetch(`${API_BASE}/users/upload`, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());
}

export default ApiService;
