import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function Validacion() {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [timeLeft, setTimeLeft] = useState(295);
  const [attempts, setAttempts] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  // Redirigir si no hay email
  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Validación del código en tiempo real
  useEffect(() => {
    if (code.length === 0) {
      setCodeError('');
      return;
    }
    if (code.length !== 6 || !/^[0-9]+$/.test(code)) {
      setCodeError(t('validacion.code6Digits'));
    } else {
      setCodeError('');
    }
  }, [code, t]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      setGeneralError('');
      // Simulamos el envío del código
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTimeLeft(295); // Reiniciar el tiempo
      setAttempts(3); // Reiniciar los intentos
      alert('Nuevo código enviado a: ' + email);
    } catch (error) {
      console.error('Error al reenviar código:', error);
      setGeneralError(t('validacion.errorResending'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    // Validar al enviar el formulario
    let formIsValid = true;
    if (code.length === 0) {
      setCodeError(t('validacion.codeRequired'));
      formIsValid = false;
    } else if (codeError) {
      formIsValid = false;
    }

    if (!formIsValid) {
      return;
    }

    if (attempts > 0) {
      try {
        setIsLoading(true);
        // Simulamos la verificación del código
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Para pruebas, cualquier código que termine en '123' será válido
        if (code.endsWith('123')) {
          // Redirigir al login después de verificación exitosa
          navigate('/login', {
            state: {
              message: 'Email verificado correctamente. Por favor, inicia sesión.',
              email: email,
            },
          });
        } else {
          setAttempts((prevAttempts) => prevAttempts - 1);
          setGeneralError(t('validacion.invalidCode'));
        }
      } catch (error) {
        console.error('Error en verificación:', error);
        setAttempts((prevAttempts) => prevAttempts - 1);
        setGeneralError(t('validacion.errorVerifying'));
      } finally {
        setIsLoading(false);
      }
    } else {
      setGeneralError(t('validacion.noAttempts'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-6">{t('validacion.enterCode')}</h2>

        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">{t('validacion.codeSentTo')}</p>
          <p>{email}</p>
          <p className="text-sm mt-2">{t('validacion.testHint')}</p>
        </div>

        {generalError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{generalError}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700">
              {t('validacion.codeLabel')}
            </label>
            <input
              id="verification-code"
              name="verification-code"
              type="text"
              inputMode="numeric"
              required
              maxLength="6"
              disabled={isLoading}
              className={`mt-1 block w-full px-3 py-2 border ${
                codeError ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center text-xl`}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {codeError && <p className="mt-2 text-sm text-red-600">{codeError}</p>}
          </div>

          <div className="text-sm text-gray-500">
            <p>{t('validacion.attempts', { attempts })}</p>
            <p>{t('validacion.codeExpires', { time: formatTime(timeLeft) })}</p>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isLoading ? t('validacion.verifying') : t('validacion.verifyCode')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isLoading || timeLeft > 0}
              className="text-sm text-blue-600 hover:text-blue-500 disabled:text-gray-400"
            >
              {t('validacion.resendCode')}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
            &larr; {t('validacion.changeEmail')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Validacion;
