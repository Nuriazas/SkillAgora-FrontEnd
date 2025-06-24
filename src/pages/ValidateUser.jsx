import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from "react-i18next";

const ValidateUser = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('');
  const [showCodeForm, setShowCodeForm] = useState(false);

  // Helper to get query params
  function getQueryParam(param) {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  }

  // Validate user with token from URL
  useEffect(() => {
    const token = getQueryParam('token');
    if (token) {
      setStatus('loading');
      axios
        .post('/api/validate-user', { token }) // Cambia la ruta al endpoint real de tu backend
        .then(() => {
          setStatus('success');
          setMessage(t('validateUser.success'));
          setTimeout(() => navigate('/login'), 3000);
        })
        .catch((err) => {
          setStatus('error');
          setMessage(
            err.response?.data?.message ||
            t('validateUser.linkError')
          );
          setShowCodeForm(true);
        });
    } else {
      setShowCodeForm(true);
    }
    // eslint-disable-next-line
  }, []);

  // Validar con código manual
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) return;
    setStatus('loading');
    try {
      await axios.post('/api/validate-user', { code }); // Cambia la ruta al endpoint real de tu backend
      setStatus('success');
      setMessage(t('validateUser.success'));
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setStatus('error');
      setMessage(
        err.response?.data?.message ||
        t('validateUser.codeError')
      );
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "4rem auto",
      padding: "2rem",
      border: "1px solid #eee",
      borderRadius: 8,
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <h2>{t('validateUser.title')}</h2>
      {status === 'loading' && <p>{t('validateUser.validating')}</p>}
      {status === 'success' && <p style={{ color: "green" }}>{message}</p>}
      {status === 'error' && <p style={{ color: "red" }}>{message}</p>}
      {showCodeForm && status !== 'success' && (
        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <label htmlFor="code">{t('validateUser.codeLabel')}</label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t('validateUser.codePlaceholder')}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem",
              margin: "12px 0"
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#3056d3",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {t('validateUser.validateBtn')}
          </button>
        </form>
      )}
      <div style={{ marginTop: 32, fontSize: "0.95em", color: "#888" }}>
        {status === 'success' ? t('validateUser.redirecting') : t('validateUser.help')}
      </div>
    </div>
  );
};

export default ValidateUser;