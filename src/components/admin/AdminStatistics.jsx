import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAdminStatistics } from "../../services/admin/adminStatisticsService.js";

const AdminStatistics = ({ isVisible }) => {
  const { t } = useTranslation();
  const [adminStats, setAdminStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const loadAdminStatistics = async () => {
    if (!isVisible) return;
    
    try {
      setLoadingStats(true);
      setStatsError(null);
      const response = await getAdminStatistics();
      
      if (response.success) {
        setAdminStats(response.data);
      } else {
        setStatsError("Error al cargar estadísticas");
      }
    } catch (err) {
      setStatsError("Error al cargar estadísticas del sistema");
      console.error("Error loading admin statistics:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      loadAdminStatistics();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800/50 p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-red-400">🔧</span>
        {t('System Statistics') || 'Estadísticas del Sistema'}
      </h2>
      
      {loadingStats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-700 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-20"></div>
            </div>
          ))}
        </div>
      ) : statsError ? (
        <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 text-center">
          <p className="text-red-400 mb-4">{statsError}</p>
          <button
            onClick={loadAdminStatistics}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : adminStats ? (
        <div className="space-y-8">
          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 hover:border-purple-500/50 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-400">{adminStats.users?.total || 0}</p>
              <p className="text-gray-400 text-sm">
                {adminStats.users?.active || 0} active ({adminStats.metrics?.active_user_percentage || 0}%)
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 hover:border-blue-500/50 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">Total Services</h3>
              <p className="text-3xl font-bold text-green-400">{adminStats.services?.total || 0}</p>
              <p className="text-gray-400 text-sm">
                {adminStats.services?.new_last_month || 0} news this month
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 hover:border-green-500/50 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">Total Orders</h3>
              <p className="text-3xl font-bold text-blue-400">{adminStats.orders?.total || 0}</p>
              <p className="text-gray-400 text-sm">
                {adminStats.orders?.completed || 0} completed ({adminStats.metrics?.completion_rate || 0}%)
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 hover:border-yellow-500/50 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">Total Income</h3>
              <p className="text-3xl font-bold text-green-400">
                {adminStats.revenue?.total_formatted || '$0.00'}
              </p>
              <p className="text-gray-400 text-sm">
                {adminStats.revenue?.last_month_formatted || '$0.00'} this month
              </p>
            </div>
          </div>

          {/* Métricas secundarias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-2">Users by Type</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Freelancers:</span>
                  <span className="text-white">{adminStats.users?.freelancers || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Clients:</span>
                  <span className="text-white">{adminStats.users?.clients || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Admins:</span>
                  <span className="text-white">{adminStats.users?.admins || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-2">Orders Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Pending:</span>
                  <span className="text-yellow-400">{adminStats.orders?.pending || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">In Progress:</span>
                  <span className="text-blue-400">{adminStats.orders?.in_progress || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivered:</span>
                  <span className="text-green-400">{adminStats.orders?.delivered || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-2">Reviews</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white">{adminStats.reviews?.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Average Rating:</span>
                  <span className="text-yellow-400">⭐ {adminStats.reviews?.average_rating || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Positives:</span>
                  <span className="text-green-400">{adminStats.reviews?.positive_percentage || 0}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Servicios - Precios */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-4">Service Prices Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Average Price</p>
                <p className="text-2xl font-bold text-purple-400">
                  {adminStats.services?.average_price_formatted || '$0.00'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Minimum Price</p>
                <p className="text-2xl font-bold text-blue-400">
                  {adminStats.services?.min_price_formatted || '$0.00'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Maximum Price</p>
                <p className="text-2xl font-bold text-green-400">
                  {adminStats.services?.max_price_formatted || '$0.00'}
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">Average Delivery Time</p>
              <p className="text-xl font-bold text-yellow-400">
                {adminStats.services?.average_delivery_time || 0} days
              </p>
            </div>
          </div>

          {/* Categorías populares */}
          {adminStats.popular_categories && adminStats.popular_categories.length > 0 && (
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-4">Most Popular Categories</h3>
              <div className="space-y-3">
                {adminStats.popular_categories.slice(0, 5).map((category, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300">{category.category_name}</span>
                    <div className="flex gap-4 text-sm">
                      <span className="text-white">{category.service_count} services</span>
                      <span className="text-green-400">{category.order_count} orders</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actividades recientes */}
          {adminStats.recent_activities && adminStats.recent_activities.length > 0 && (
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 max-h-80 overflow-y-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity (Last 7 days)</h3>
              <div className="space-y-3">
                {adminStats.recent_activities.map((activity, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700/30 last:border-b-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        activity.activity_type === 'new_user' ? 'bg-green-400' :
                        activity.activity_type === 'new_service' ? 'bg-blue-400' :
                        'bg-yellow-400'
                      }`}></span>
                      <span className="text-gray-300 text-sm">{activity.description}</span>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {new Date(activity.activity_date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AdminStatistics;