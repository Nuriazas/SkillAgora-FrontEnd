import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Home = () => {
  const { user, logout, loading } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      setError(t('home.logoutError'));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">SkillAgora</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || t('home.user')}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || t('home.userEmail')}
                </p>
              </div>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? t('home.loggingOut') : t('home.logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
            <button
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setError('')}
            >
              <span className="sr-only">{t('home.close')}</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('home.dashboardTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('home.userInfo')}</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">{t('home.name')}</dt>
                    <dd className="text-sm text-gray-900">{user?.name || t('home.notAvailable')}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">{t('home.email')}</dt>
                    <dd className="text-sm text-gray-900">{user?.email || t('home.notAvailable')}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">{t('home.lastLogin')}</dt>
                    <dd className="text-sm text-gray-900">
                      {user?.lastLogin ? formatDate(user.lastLogin) : t('home.notAvailable')}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('home.recentActivity')}</h3>
                <p className="text-sm text-gray-500">
                  {t('home.recentActivityDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de confirmación de logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('home.confirmLogout')}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {t('home.confirmLogoutDesc')}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {t('home.cancel')}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? t('home.loggingOutShort') : t('home.logout')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;