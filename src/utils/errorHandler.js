import { toast } from 'react-toastify';

export const handleError = (error) => {
  console.error('Error:', error);

  let message = 'Ha ocurrido un error inesperado';

  if (error.response) {
    // Error de respuesta del servidor
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        message = data.message || 'Solicitud incorrecta';
        break;
      case 401:
        message = 'No autorizado. Por favor, inicia sesión nuevamente';
        break;
      case 403:
        message = 'No tienes permisos para realizar esta acción';
        break;
      case 404:
        message = 'Recurso no encontrado';
        break;
      case 500:
        message = 'Error interno del servidor';
        break;
      default:
        message = data.message || 'Error en la solicitud';
    }
  } else if (error.request) {
    // Error de red
    message = 'Error de conexión. Por favor, verifica tu conexión a internet';
  }

  toast.error(message);
  return message;
};

export const handleSuccess = (message) => {
  toast.success(message);
};

export const handleWarning = (message) => {
  toast.warning(message);
};

export const handleInfo = (message) => {
  toast.info(message);
}; 