import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { fetchNotifications } from "../../services/notification/notificationService.js";

const NotificationsPoller = ({ user, token }) => {
  const lastNotificationIds = useRef(new Set());


  useEffect(() => {
    if (!user || !token) {
      console.log("⏸️ NotificationsPoller pausado - falta user o token");
      return;
    }

  

    const interval = setInterval(async () => {
      
      try {
        const notifications = await fetchNotifications(token);
        
        if (notifications && notifications.length > 0) {
          console.log("👀 Primera notification:", notifications[0]);
          // Solo mostrar notificaciones nuevas
          notifications.forEach((notif) => {
            if (!lastNotificationIds.current.has(notif.id)) {
              toast(notif.content);
              // CORREGIDO: Agregar la notificación al Set para no mostrarla de nuevo
              lastNotificationIds.current.add(notif.id);
            } else {
              console.log("⏭️ Notification ya mostrada - saltando");
            }
          });
        }
      } catch (error) {
        console.error("❌ ERROR en polling notifications:");
        console.error("🚨 Error completo:", error);
        console.error("📡 Response:", error.response?.data);
        console.error("📊 Status:", error.response?.status);
      }
      
    }, 5000); // CAMBIADO: De 1 segundo a 5 segundos para no sobrecargar

    return () => {
      clearInterval(interval);
    };
  }, [user, token]);

  return null;
};

export default NotificationsPoller;