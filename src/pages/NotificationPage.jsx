import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContextProvider";
import Header from "../components/Header.jsx";
import { useTranslation } from "react-i18next";

const NotificationPage = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const { t } = useTranslation();

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL_API}/orders/get`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(res.data.data || []);
    } catch (error) {
      console.error("Error al cargar las órdenes:", error);
      toast.error("Error al cargar las órdenes");
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL_API}/notifications/contacts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(res.data.data || []);
    } catch (error) {
      console.error("Error al cargar los mensajes:", error);
      toast.error("Error al cargar los mensajes");
    } finally {
      setLoadingMessages(false);
    }
  };

  const openOrderModal = (order) => {
    console.log("Abrir modal de orden:", order);
  };

  const openMessageModal = (msg) => {
    console.log("Abrir modal de mensaje:", msg);
  };

  useEffect(() => {
    fetchOrders();
    fetchMessages();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: t('notificationPage.status.completed'), class: "bg-green-100 text-green-800" },
      pending: { label: t('notificationPage.status.pending'), class: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: t('notificationPage.status.inProgress'), class: "bg-blue-100 text-blue-800" },
      delivered: { label: t('notificationPage.status.delivered'), class: "bg-purple-100 text-purple-800" },
      cancelled: { label: t('notificationPage.status.cancelled'), class: "bg-red-100 text-red-800" },
    };

    const config = statusConfig[status] || {
      label: status ? status : t('notificationPage.status.noStatus'),
      class: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${config.class}`}
      >
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return t('notificationPage.noDate');
    return new Date(dateString).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="w-full h-full bg-gray-800/5"
          style={{
            backgroundImage:
              "radial-gradient(circle, #9C92AC 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <Header />
        <Toaster position="top-right" />

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              {t('notificationPage.title')}{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {t('notificationPage.panel')}
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              {t('notificationPage.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Contenedor de Mensajes */}
            <section className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 shadow-2xl">
              <div className="p-6 border-b border-gray-800/50">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  {t('notificationPage.messages')} ({messages.length})
                  {loadingMessages && (
                    <span className="text-purple-400 text-base">
                      {" "}
                      - {t('notificationPage.loading')}
                    </span>
                  )}
                </h2>
              </div>

              <div className="p-6 h-[600px] overflow-y-auto custom-scrollbar">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-gray-400 text-lg">
                      {t('notificationPage.noMessages')}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      {t('notificationPage.noMessagesDesc')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div
                        key={msg.id || index}
                        className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 cursor-pointer transition-all duration-200 hover:border-purple-500/30"
                        onClick={() => openMessageModal(msg)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium text-sm">
                              {msg.senderName?.[0] || "?"}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-base mb-1">
                              {msg.senderName && msg.senderLastName
                                ? `${msg.senderName} ${msg.senderLastName}`
                                : t('notificationPage.unknownUser')}
                            </h4>
                            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                              {msg.content || t('notificationPage.noContent')}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {formatDate(msg.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Contenedor de Órdenes */}
            <section className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 shadow-2xl">
              <div className="p-6 border-b border-gray-800/50">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {t('notificationPage.orders')} ({orders.length})
                  {loadingOrders && (
                    <span className="text-blue-400 text-base">
                      {" "}
                      - {t('notificationPage.loading')}
                    </span>
                  )}
                </h2>
              </div>

              <div className="p-6 h-[600px] overflow-y-auto custom-scrollbar">
                {loadingOrders ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-gray-400 text-lg">
                      {t('notificationPage.noOrders')}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      {t('notificationPage.noOrdersDesc')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, index) => (
                      <div
                        key={order.id || index}
                        className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 cursor-pointer transition-all duration-200 hover:border-blue-500/30"
                        onClick={() => openOrderModal(order)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium text-sm">
                              {order.client_name?.[0] || "?"}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-base mb-1">
                              {order.client_name && order.client_lastName
                                ? `${order.client_name} ${order.client_lastName}`
                                : "Cliente desconocido"}
                            </h4>
                            <p className="text-gray-300 text-sm font-medium mb-2">
                              {order.service_title || "Servicio sin título"}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getStatusBadge(order.status)}
                                <span className="text-gray-400 text-xs">
                                  {order.total_price || "N/A"}{" "}
                                  {order.currency_code || "USD"}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-500 text-xs mt-2">
                              {formatDate(order.ordered_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.7);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NotificationPage;
