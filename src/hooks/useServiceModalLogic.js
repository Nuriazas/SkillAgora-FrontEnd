import { useEffect, useState } from "react";
import { sendContactRequest } from "../services/contact/sendContactRequestService";
import { createOrder } from "../services/orders/createOrderService";
import { servicesApi } from "../services/api/api";

/**
 * Hook personalizado para manejar toda la lógica del ServiceModal
 */
export const useServiceModalLogic = (service, onClose) => {
	// Estados del modal
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [isResultModalOpen, setIsResultModalOpen] = useState(false);
	const [resultData, setResultData] = useState({
		type: "",
		title: "",
		message: "",
		orderData: null,
	});
	const [isCreatingOrder, setIsCreatingOrder] = useState(false);
	const [serviceDetails, setServiceDetails] = useState(service);
	const [loadingDetails, setLoadingDetails] = useState(false);

	// Cargar detalles completos del servicio si es necesario
	useEffect(() => {
		const loadServiceDetails = async () => {
			if (!service.user_id && service.service_id) {
				try {
					setLoadingDetails(true);
					const response = await servicesApi.getServiceById(service.service_id);
					if (response.success) {
						setServiceDetails(response.data);
					}
				} catch (error) {
					console.error("Error cargando detalles del servicio:", error);
				} finally {
					setLoadingDetails(false);
				}
			}
		};

		loadServiceDetails();
	}, [service]);

	// Manejar ESC para cerrar modal
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (
				e.key === "Escape" &&
				!isContactModalOpen &&
				!isConfirmModalOpen &&
				!isResultModalOpen
			) {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onClose, isContactModalOpen, isConfirmModalOpen, isResultModalOpen]);

	// Handler para abrir modal de contacto
	const handleContactSeller = () => {
		// Debug completo del objeto serviceDetails
		console.log("🔍 DEBUG COMPLETO DEL SERVICIO:");
		console.log("🔍 serviceDetails completo:", serviceDetails);
		console.log("🔍 service original:", service);
		console.log("🔍 Todas las propiedades de serviceDetails:", Object.keys(serviceDetails));
		console.log("🔍 Todas las propiedades de service:", Object.keys(service));
		
		// Buscar el user_id de manera más exhaustiva - agregamos service.id que sabemos que funciona
		const userId = serviceDetails.user_id || 
					   serviceDetails.userId || 
					   serviceDetails.freelancer_id || 
					   serviceDetails.freelancer?.id ||
					   serviceDetails.freelancer?.user_id ||
					   serviceDetails.provider_id ||
					   serviceDetails.seller_id ||
					   serviceDetails.id ||  // Agregado basado en el debug
					   service.user_id ||
					   service.userId ||
					   service.freelancer_id ||
					   service.provider_id ||
					   service.seller_id ||
					   service.id;  // Agregado basado en el debug

		console.log("🔍 User ID encontrado:", userId);
		console.log("🔍 Tipo de userId:", typeof userId);

		// Si aún no encontramos el userId, intentemos con propiedades que contengan 'id'
		if (!userId) {
			console.log("🔍 Buscando propiedades que contengan 'id':");
			const serviceKeys = Object.keys(serviceDetails);
			const idProperties = serviceKeys.filter(key => 
				key.toLowerCase().includes('id') || 
				key.toLowerCase().includes('user')
			);
			console.log("🔍 Propiedades con 'id' o 'user':", idProperties);
			
			idProperties.forEach(prop => {
				console.log(`🔍 ${prop}:`, serviceDetails[prop]);
			});
		}

		if (!userId) {
			// Mostrar alert más detallado para debug
			alert(`No se puede contactar con este vendedor. 
			
Debug info:
- serviceDetails keys: ${Object.keys(serviceDetails).join(', ')}
- service keys: ${Object.keys(service).join(', ')}
- Revisa la consola para más detalles.`);
			return;
		}

		console.log("✅ Abriendo modal de contacto con userId:", userId);
		setIsContactModalOpen(true);
	};

	// Handler para enviar mensaje de contacto
	const handleSendMessage = async (message) => {
		try {
			const token = localStorage.getItem("token");
			
			// Buscar userId - ahora sabemos que service.id funciona para abrir el modal
			const userId = serviceDetails.user_id || 
						   serviceDetails.userId || 
						   serviceDetails.freelancer_id || 
						   serviceDetails.freelancer?.id ||
						   serviceDetails.freelancer?.user_id ||
						   serviceDetails.provider_id ||
						   serviceDetails.seller_id ||
						   serviceDetails.id ||  // Agregado basado en el debug
						   service.user_id ||
						   service.userId ||
						   service.freelancer_id ||
						   service.provider_id ||
						   service.seller_id ||
						   service.id;  // Agregado basado en el debug

			console.log("🔑 Token RAW:", token);
			console.log("🔑 Tipo de token:", typeof token);
			console.log("🔑 ¿Es null?:", token === null);
			console.log('🔑 ¿Es string "null"?:', token === "null");
			console.log("🔑 ¿Es undefined?:", token === undefined);
			console.log('🔑 ¿Es string "undefined"?:', token === "undefined");
			console.log(
				"🔑 Todas las claves localStorage:",
				Object.keys(localStorage)
			);

			// Validar token (filtrar valores inválidos)
			if (!token || token === "null" || token === "undefined") {
				throw new Error("Debes iniciar sesión para contactar con el vendedor");
			}

			// Validar userId
			if (!userId) {
				throw new Error(
					"No se puede contactar con este vendedor. ID de usuario no disponible."
				);
			}

			const response = await sendContactRequest(userId, message, token);

			// Retornar la respuesta para que ContactModal pueda usarla
			return response;
		} catch (error) {
			console.error("Error sending contact request:", error);

			if (
				error.message.includes("Token no válido") ||
				error.message.includes("401")
			) {
				throw new Error(
					"Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
				);
			} else {
				throw new Error(error.message || "Error al enviar la solicitud");
			}
		}
	};

    // Handler para cerrar servicio con ESC
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

	// Handler para contratar servicio
	const handleHireService = () => {
		console.log("serviceDetails en handleHireService:", serviceDetails);
		const token = localStorage.getItem("token");
		const serviceId = serviceDetails.service_id || serviceDetails.id;
		
		// Validar token
		if (!token || token === "null" || token === "undefined") {
			setResultData({
				type: "error",
				title: "Error de Autenticación",
				message: "Debes iniciar sesión para contratar este servicio.",
				orderData: null,
			});
			setIsResultModalOpen(true);
			return;
		}

		// Validar serviceId
		if (!serviceId) {
			setResultData({
				type: "error",
				title: "Error",
				message:
					"ID del servicio no disponible. Por favor, inténtalo de nuevo.",
				orderData: null,
			});
			setIsResultModalOpen(true);
			return;
		}

		// Abrir modal de confirmación
		setIsConfirmModalOpen(true);
	};

	// Handler para confirmar la contratación
	const handleConfirmHire = async () => {
		try {
			setIsCreatingOrder(true);
			const token = localStorage.getItem("token");
			const serviceId = serviceDetails.service_id || serviceDetails.id;
			console.log("serviceDetails al contratar:", serviceDetails);

			console.log("🛒 Intentando contratar servicio:", serviceId);

			const response = await createOrder(serviceId, token);

			// Cerrar modal de confirmación
			setIsConfirmModalOpen(false);
			setIsCreatingOrder(false);

			// Mostrar resultado exitoso
			setResultData({
				type: "success",
				title: "¡Contratación Exitosa!",
				message:
					"Tu orden ha sido creada correctamente. Recibirás una notificación cuando el freelancer la acepte.",
				orderData: response.data,
			});
			setIsResultModalOpen(true);
		} catch (error) {
			console.error("Error creating order:", error);
			setIsCreatingOrder(false);
			setIsConfirmModalOpen(false);

			// Mostrar resultado de error
			let errorMessage =
				"Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.";

			if (
				error.message.includes("Token no válido") ||
				error.message.includes("401")
			) {
				errorMessage =
					"Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
			} else if (error.message) {
				errorMessage = error.message;
			}

			setResultData({
				type: "error",
				title: "Error al Contratar",
				message: errorMessage,
				orderData: null,
			});
			setIsResultModalOpen(true);
		}
	};

	return {
		// Estados
		isContactModalOpen,
		isConfirmModalOpen,
		isResultModalOpen,
		resultData,
		isCreatingOrder,
		serviceDetails,
		loadingDetails,

		// Setters
		setIsContactModalOpen,
		setIsConfirmModalOpen,
		setIsResultModalOpen,

		// Handlers
		handleContactSeller,
		handleSendMessage,
		handleHireService,
		handleConfirmHire,
        handleKeyDown,
	};
};