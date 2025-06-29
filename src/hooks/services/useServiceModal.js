import { useEffect, useState } from "react";
import { sendContactRequest } from "../../services/contact/sendContactRequestService.js";
import { createOrder, checkOrderStatus } from "../../services/orders/createOrderService.js";
import { servicesApi } from "../../services/api/api.js";
import { getServiceById } from "../../services/services/getServiceByIdService.js";
import { getToken } from "../../utils/tokenUtils.js";

// Hook para manejar toda la lógica del modal de servicio
// Todavia por modularizar

export const useServiceModalLogic = (service, onClose) => {
	// Estados del modal
	const [isContactModalOpen, setIsContactModalOpen] = useState(false); // Modal para contactar al usuario que corresponde al servicio
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Modal para confirmar la contratación del servicio
	const [isResultModalOpen, setIsResultModalOpen] = useState(false); // Modal para mostrar el resultado de la acción
	const [currentUserId, setCurrentUserId] = useState(null); // ID del usuario actual
	const [resultData, setResultData] = useState({
		type: "",
		title: "",
		message: "",
		orderData: null,
	}); // Datos del resultado de la acción (contratación, error, etc.)
	const [isCreatingOrder, setIsCreatingOrder] = useState(false); // Estado para indicar si se está creando una orden
	const [serviceDetails, setServiceDetails] = useState(service); // Detalles del servicio. Se inicializa con el servicio pasado como prop
	const [loadingDetails, setLoadingDetails] = useState(false); // Estado para indicar si se están cargando los detalles del servicio
	
	const [orderStatus, setOrderStatus] = useState({
		hasActiveOrder: false,
		orderStatus: null,
		orderId: null,
		loading: false
	}); // Estado para manejar el estado de la orden (en caso de que haya una orden activa)

	useEffect(() => { // useEffect para cargar el userId del dueño del servicio al abrir el modal
		const loadOwnerUserId = async () => {
			try {

				const serviceData = await getServiceById(serviceDetails.id);
				const userId = serviceData?.data?.user_id;
				
				if (userId) {
					setCurrentUserId(userId);
				} else {
					console.error("⚠️ No se pudo obtener el user_id del servicio");
				}
			} catch (error) {
				console.error("❌ Error obteniendo userId del servicio:", error);
			}
		};

		if (serviceDetails?.id && !currentUserId && !loadingDetails) {
			loadOwnerUserId();
		}
	}, [serviceDetails, currentUserId, loadingDetails]);

	useEffect(() => {	// useEffect para verificar el estado de la orden al cargar el modal
		const checkOrderStatusOnLoad = async () => {
			const token = getToken();
			const serviceId = serviceDetails.id;

			if (!token || token === "null" || token === "undefined" || !serviceId) {
				setOrderStatus({
					hasActiveOrder: false,
					orderStatus: null,
					orderId: null,
					loading: false
				});
				return;
			}

			try {
				const status = await checkOrderStatus(serviceId, token);
				
				setOrderStatus({
					...status,
					loading: false
				});

			} catch (error) {
				console.error("Error verificando estado de orden:", error);
				setOrderStatus({
					hasActiveOrder: false,
					orderStatus: null,
					orderId: null,
					loading: false
				});
			}
		};

		if (serviceDetails && !loadingDetails) {
			checkOrderStatusOnLoad();
		}
	}, [serviceDetails, loadingDetails]);

	const handleContactSeller = () => {  // Handler para abrir el modal de contacto del vendedor y verificar el currentUserId
		
		if (!currentUserId) {
			alert("Error: No se puede contactar con este vendedor. Información de usuario no disponible.");
			return;
		}
		setIsContactModalOpen(true);
	};

	// Handler para enviar un mensaje
	const handleSendMessage = async (message) => {
		try {
			const token = getToken();
			const serviceId = serviceDetails?.id;

			if (!token || token === "null" || token === "undefined") {
				throw new Error("Debes iniciar sesión para contactar con el vendedor");
			}

			// Si no tenemos serviceId, mostramos un error
			if (!serviceId) {
				console.error("❌ serviceId no disponible:", serviceId);
				throw new Error("No se puede contactar con este vendedor. ID de servicio no disponible.");
			}
			
			const response = await sendContactRequest(serviceId, message, token); // el backend se encarga de sacar el providerId del serviceId

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

	// useEffect para cerrar el modal al presionar ESC
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

	// Handler para cerrar servicio con ESC
	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			onClose();
		}
	};

	// Handler para contratar servicio
	const handleHireService = () => {
		const token = getToken();
		const serviceId = serviceDetails.service_id || serviceDetails.id;
		
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

		if (!serviceId) {
			setResultData({
				type: "error",
				title: "Error",
				message: "ID del servicio no disponible. Por favor, inténtalo de nuevo.",
				orderData: null,
			});
			setIsResultModalOpen(true);
			return;
		}

		if (orderStatus.hasActiveOrder) {
			setResultData({
				type: "error",
				title: "Servicio ya contratado",
				message: `Ya tienes una orden activa para este servicio. Estado: ${orderStatus.orderStatus}`,
				orderData: null,
			});
			setIsResultModalOpen(true);
			return;
		}

		setIsConfirmModalOpen(true);
	};

	// Handler para confirmar la contratación
	const handleConfirmHire = async () => {
		try {
			setIsCreatingOrder(true);
			const token = getToken();
			const serviceId = serviceDetails.service_id || serviceDetails.id;
			const response = await createOrder(serviceId, token);

			setIsConfirmModalOpen(false);
			setIsCreatingOrder(false);
			setOrderStatus({
				hasActiveOrder: true,
				orderStatus: "pending",
				orderId: response.data.orderId,
				loading: false
			});
			setResultData({
				type: "success",
				title: "¡Contratación Exitosa!",
				message: "Tu orden ha sido creada correctamente. Recibirás una notificación cuando el freelancer la acepte.",
				orderData: response.data,
			});
			setIsResultModalOpen(true);
		} catch (error) {
			console.error("Error creating order:", error);
			setIsCreatingOrder(false);
			setIsConfirmModalOpen(false);
			
			let errorMessage = "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.";

			if (
				error.message.includes("Token no válido") ||
				error.message.includes("401")
			) {
				errorMessage = "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
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

	return { // Retorna todos los estados
		isContactModalOpen,
		isConfirmModalOpen,
		isResultModalOpen,
		resultData,
		isCreatingOrder,
		serviceDetails,
		loadingDetails,
		currentUserId,
		orderStatus: orderStatus || {
			hasActiveOrder: false,
			orderStatus: null,
			orderId: null,
			loading: false
		},

		// Retorna todos los setters para actualizar los estados
		setIsContactModalOpen,
		setIsConfirmModalOpen,
		setIsResultModalOpen,
		setCurrentUserId,

		// Retorna todos los handlers para submitear las acciones
		handleContactSeller,
		handleSendMessage,
		handleHireService,
		handleConfirmHire,
		handleKeyDown,
	};
};