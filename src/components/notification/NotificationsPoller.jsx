import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { fetchNotifications } from "../../services/notification/notificationService.js";

const NotificationsPoller = ({ user, token }) => {
  const lastNotificationIds = useRef(new Set());

  console.log("🔔 NotificationsPoller iniciado");
  console.log("👤 User:", user ? "✅ Existe" : "❌ No existe");
  console.log("🔑 Token:", token ? "✅ Existe" : "❌ No existe");

  useEffect(() => {
    if (!user || !token) {
      console.log("⏸️ NotificationsPoller pausado - falta user o token");
      return;
    }

    console.log("🚀 Iniciando polling de notificaciones cada 5 segundos");

    const interval = setInterval(async () => {
      console.log("\n🔄 === POLLING NOTIFICATIONS ===");
      
      try {
        const notifications = await fetchNotifications(token);
        
        console.log("✅ Notifications recibidas:");
        console.log("📊 Cantidad:", notifications?.length || 0);
        console.log("🗂️ Data completa:", notifications);
        
        if (notifications && notifications.length > 0) {
          console.log("👀 Primera notification:", notifications[0]);
        }

        notifications?.forEach((notif, index) => {
          console.log(`\n📩 Procesando notification ${index + 1}:`);
          console.log("🆔 ID:", notif.id);
          console.log("📝 Content:", notif.content);
          console.log("🏷️ Type:", notif.type);
          console.log("✅ Ya mostrada?", lastNotificationIds.current.has(notif.id));
          
          // Solo mostrar notificaciones nuevas
          if (!lastNotificationIds.current.has(notif.id)) {
            console.log("🆕 Nueva notification - mostrando toast");
            toast(notif.content);
            
            // CORREGIDO: Agregar la notificación al Set para no mostrarla de nuevo
            lastNotificationIds.current.add(notif.id);
            console.log("💾 Notification agregada al Set");
          } else {
            console.log("⏭️ Notification ya mostrada - saltando");
          }
        });
        
        console.log("📋 IDs en Set:", Array.from(lastNotificationIds.current));
        
      } catch (error) {
        console.error("❌ ERROR en polling notifications:");
        console.error("🚨 Error completo:", error);
        console.error("📡 Response:", error.response?.data);
        console.error("📊 Status:", error.response?.status);
      }
      
      console.log("🏁 Polling cycle terminado\n");
    }, 5000); // CAMBIADO: De 1 segundo a 5 segundos para no sobrecargar

    return () => {
      console.log("🛑 NotificationsPoller limpiado");
      clearInterval(interval);
    };
  }, [user, token]);

  return null;
};

export default NotificationsPoller;