import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const UserValidation = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutos
  const [canResend, setCanResend] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [rateLimitResetTime, setRateLimitResetTime] = useState(null);
  
  // Referencias para cleanup
  const timerIntervalRef = useRef(null);
  const redirectTimeoutRef = useRef(null);
  const rateLimitTimeoutRef = useRef(null);

  // Constantes de seguridad
  const MAX_ATTEMPTS = 3;
  const RATE_LIMIT_WINDOW = 900000; // 15 minutos en ms
  const MAX_REQUESTS_PER_WINDOW = 5;

  // Cleanup al desmontar el componente
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      if (rateLimitTimeoutRef.current) {
        clearTimeout(rateLimitTimeoutRef.current);
      }
    };
  }, []);

  // Timer para el código de verificación
  useEffect(() => {
    if (step === 2 && timer > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            setError('El código ha expirado. Por favor, solicita uno nuevo.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [step, timer]);

  // Rate limiting básico (en producción esto debe ser del servidor)
  const checkRateLimit = () => {
    const now = Date.now();
    const requests = JSON.parse(localStorage.getItem('validationRequests') || '[]');
    const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
      const oldestRequest = Math.min(...recentRequests);
      const resetTime = oldestRequest + RATE_LIMIT_WINDOW;
      setRateLimitResetTime(resetTime);
      return false;
    }
    
    // Actualizar el registro de requests
    recentRequests.push(now);
    localStorage.setItem('validationRequests', JSON.stringify(recentRequests));
    return true;
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email) && email.length <= 254;
  };

  // Simulación de diferentes tipos de errores del servidor
  const simulateServerResponse = (type, email = '', code = '') => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (type === 'email') {
          // Simular diferentes respuestas del servidor
          const random = Math.random();
          if (email === 'blocked@example.com') {
            reject({ type: 'ACCOUNT_BLOCKED', message: 'Esta cuenta ha sido bloqueada temporalmente' });
          } else if (email === 'notfound@example.com') {
            reject({ type: 'EMAIL_NOT_FOUND', message: 'El correo electrónico no está registrado' });
          } else if (random < 0.1) {
            reject({ type: 'SERVER_ERROR', message: 'Error del servidor. Intenta más tarde' });
          } else {
            resolve({ success: true });
          }
        } else if (type === 'code') {
          const random = Math.random();
          if (code === '000000') {
            reject({ type: 'INVALID_CODE', message: 'El código ingresado es incorrecto' });
          } else if (code === '111111') {
            reject({ type: 'EXPIRED_CODE', message: 'El código ha expirado. Solicita uno nuevo' });
          } else if (code === '222222') {
            reject({ type: 'TOO_MANY_ATTEMPTS', message: 'Demasiados intentos. Espera 15 minutos' });
          } else if (random < 0.1) {
            reject({ type: 'SERVER_ERROR', message: 'Error del servidor. Intenta más tarde' });
          } else {
            resolve({ success: true });
          }
        }
      }, 1000);
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo electrónico válido');
      return;
    }

    // Verificar rate limiting
    if (!checkRateLimit()) {
      const resetTime = new Date(rateLimitResetTime).toLocaleTimeString();
      setError(`Demasiadas solicitudes. Intenta nuevamente después de las ${resetTime}`);
      return;
    }

    setLoading(true);
    try {
      await simulateServerResponse('email', email);
      setMessage('Código enviado a: ' + email);
      setStep(2);
      setTimer(300);
      setCanResend(false);
      setAttempts(0);
    } catch (err) {
      handleServerError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (code.length !== 6) {
      setError('El código debe tener 6 dígitos');
      return;
    }

    if (timer <= 0) {
      setError('El código ha expirado. Por favor, solicita uno nuevo.');
      return;
    }

    if (attempts >= MAX_ATTEMPTS) {
      setError('Demasiados intentos fallidos. Por favor, solicita un nuevo código.');
      return;
    }

    setLoading(true);
    try {
      await simulateServerResponse('code', '', code);
      setMessage('¡Validación exitosa! Redirigiendo...');
      
      // Limpiar el timeout anterior si existe
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      redirectTimeoutRef.current = setTimeout(() => {
        navigate('/login', {
          state: { message: '¡Validación exitosa! Por favor inicia sesión.' },
        });
      }, 2000);
    } catch (err) {
      setAttempts(prev => prev + 1);
      handleServerError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    // Verificar rate limiting
    if (!checkRateLimit()) {
      const resetTime = new Date(rateLimitResetTime).toLocaleTimeString();
      setError(`Demasiadas solicitudes. Intenta nuevamente después de las ${resetTime}`);
      return;
    }

    setError('');
    setMessage('');
    setLoading(true);

    try {
      await simulateServerResponse('email', email);
      setMessage('Código reenviado a: ' + email);
      setTimer(300);
      setCanResend(false);
      setAttempts(0); // Resetear intentos con nuevo código
    } catch (err) {
      handleServerError(err);
    } finally {
      setLoading(false);
    }
  };

  // Manejo centralizado de errores específicos
  const handleServerError = (error) => {
    switch (error.type) {
      case 'EMAIL_NOT_FOUND':
        setError('El correo electrónico no está registrado en nuestro sistema');
        break;
      case 'ACCOUNT_BLOCKED':
        setError('Tu cuenta ha sido bloqueada temporalmente por seguridad');
        break;
      case 'INVALID_CODE':
        setError(`Código incorrecto. Te quedan ${MAX_ATTEMPTS - attempts - 1} intentos`);
        break;
      case 'EXPIRED_CODE':
        setError('El código ha expirado. Por favor, solicita uno nuevo');
        setTimer(0);
        setCanResend(true);
        break;
      case 'TOO_MANY_ATTEMPTS':
        setError('Demasiados intentos fallidos. Tu cuenta ha sido bloqueada temporalmente');
        setStep(1); // Volver al paso 1
        break;
      case 'SERVER_ERROR':
        setError('Error del servidor. Por favor, intenta más tarde');
        break;
      case 'RATE_LIMIT':
        setError('Demasiadas solicitudes. Por favor, espera unos minutos');
        break;
      default:
        setError(error.message || 'Ha ocurrido un error inesperado');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const goBackToEmailStep = () => {
    setStep(1);
    setCode('');
    setError('');
    setMessage('');
    setAttempts(0);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {step === 1 ? 'Validación de Usuario' : 'Ingresa el Código'}
        </h2>

        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm"
            >
              {message}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {step === 1 ? (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleEmailSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="ejemplo@correo.com"
                required
                aria-describedby={error ? "email-error" : undefined}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Enviando...' : 'Enviar Código'}
            </button>
          </motion.form>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleCodeSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de Verificación
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center text-lg tracking-wider"
                placeholder="000000"
                required
                maxLength={6}
                aria-describedby={error ? "code-error" : undefined}
              />
              <div className="text-xs text-gray-500 mt-1">
                Intentos restantes: {MAX_ATTEMPTS - attempts}
              </div>
            </div>
            <div className="text-sm text-gray-600 text-center">
              {timer > 0 ? (
                <p>El código expirará en {formatTime(timer)}</p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={!canResend || loading}
                  className="text-blue-600 hover:text-blue-800 disabled:opacity-50 transition-colors"
                >
                  Reenviar código
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || attempts >= MAX_ATTEMPTS}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Verificando...' : 'Verificar Código'}
            </button>
            <button
              type="button"
              onClick={goBackToEmailStep}
              className="w-full text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              ← Cambiar correo electrónico
            </button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default UserValidation;

//1. Validación por email y código:El usuario ingresa su correo electrónico y recibe un código de 6 dígitos que debe introducir para validar su identidad.

//2. Sistema de seguridad con límites:Tiene protecciones como máximo 3 intentos para el código, límite de 5 solicitudes cada 15 minutos, y códigos que expiran en 5 minutos.

//3. Interfaz de dos pasos:Primero solicita el email, luego cambia a una pantalla donde se ingresa el código de verificación, con opción de volver atrás.

//4. Manejo de errores específicos:Muestra mensajes personalizados para diferentes problemas: email no registrado, cuenta bloqueada, código incorrecto, demasiados intentos, etc.

//5. Simulación completa del proceso:Incluye temporizadores, animaciones, y simula respuestas del servidor para probar diferentes escenarios (éxito, errores, bloqueos).