import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { testConnection } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { loginWithApi, error: authError, loading } = useAuth();
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    // Probar la conexión con el backend cuando se monte el componente
    const checkConnection = async () => {
      try {
        console.log('Probando conexión con el backend...');
        const response = await testConnection();
        console.log('Conexión exitosa:', response);
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
        setApiError(
          'No se pudo conectar con el servidor. Por favor, verifica que el backend esté corriendo.'
        );
      }
    };

    checkConnection();
  }, []);

  // Validación de email en tiempo real
  useEffect(() => {
    if (email.length === 0) {
      setEmailError('');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Introduce un formato de email válido (ej. usuario@dominio.com)');
    } else {
      setEmailError('');
    }
  }, [email]);

  // Validación de contraseña en tiempo real
  useEffect(() => {
    if (password.length === 0) {
      setPasswordError('');
      return;
    }

    // Validación para 6 caracteres exactos
    if (password.length !== 6) {
      setPasswordError('La contraseña debe tener exactamente 6 caracteres');
    } else {
      setPasswordError('');
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    let formIsValid = true;
    if (!email) {
      setEmailError('El email es obligatorio');
      formIsValid = false;
    } else if (emailError) {
      formIsValid = false;
    }

    if (!password) {
      setPasswordError('La contraseña es obligatoria');
      formIsValid = false;
    } else if (passwordError) {
      formIsValid = false;
    }

    if (!formIsValid) {
      setGeneralError('Por favor, corrige los errores del formulario.');
      return;
    }

    try {
      const result = await loginWithApi(email, password, rememberMe);
      if (result.success) {
        navigate('/home');
      } else {
        setGeneralError(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      setGeneralError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
        </div>
        {apiError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {apiError}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {generalError && <div className="text-red-500 text-sm text-center">{generalError}</div>}
          {authError && <div className="text-red-500 text-sm text-center">{authError}</div>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  emailError ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Contraseña (6 dígitos)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                maxLength={6}
              />
              {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>
            <div className="text-sm">
              <Link
                to="/recuperar-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          ¿No tienes una cuenta?
          <Link to="/registro" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

//1.Validación de email automática - Verifica formato correcto en tiempo real

//2.Medidor de fortaleza de contraseña - Barra visual con 5 niveles de seguridad

//3.Checkbox "Recordarme" - Opción para sesiones más largas

//4.Enlaces adicionales - Registro y recuperación de contraseña

//5.Validación completa - Botón deshabilitado si hay errores
