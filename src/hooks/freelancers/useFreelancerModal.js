import { useEffect, useState } from "react";
import { sendContactRequest } from "../../services/contact/sendContactRequestService.js";
import { freelancerService } from "../../services/getAllFreelancersService.js";

/**
 * Hook personalizado para manejar toda la lógica del FreelancerModal
 */
export const useFreelancerModalLogic = (freelancer, onClose) => {
	// Estados del modal
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);
	const [isHireModalOpen, setIsHireModalOpen] = useState(false);
	const [isResultModalOpen, setIsResultModalOpen] = useState(false);
	const [resultData, setResultData] = useState({
		type: "",
		title: "",
		message: "",
		freelancerData: null,
	});
	const [isProcessing, setIsProcessing] = useState(false);
	const [freelancerDetails, setFreelancerDetails] = useState(freelancer);
	const [loadingDetails, setLoadingDetails] = useState(false);

	// Cargar detalles completos del freelancer si es necesario
	useEffect(() => {
		const loadFreelancerDetails = async () => {
			if (!freelancer.email && freelancer.id) {
				try {
					setLoadingDetails(true);
					const response = await freelancerService.getById(freelancer.id);
					setFreelancerDetails(response);
				} catch (error) {
					console.error("Error cargando detalles del freelancer:", error);
				} finally {
					setLoadingDetails(false);
				}
			}
		};

		loadFreelancerDetails();
	}, [freelancer]);

	// Manejar ESC para cerrar modal
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (
				e.key === "Escape" &&
				!isContactModalOpen &&
				!isHireModalOpen &&
				!isResultModalOpen
			) {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onClose, isContactModalOpen, isHireModalOpen, isResultModalOpen]);

	// Handler para abrir modal de contacto
	const handleContactFreelancer = () => {
		const userId = freelancerDetails.id;

		console.log("🔍 Freelancer details completo:", freelancerDetails);
		console.log("🔍 User ID encontrado:", userId);

		if (!userId) {
			alert(
				"No se puede contactar con este freelancer. ID de usuario no disponible."
			);
			return;
		}

		setIsContactModalOpen(true);
	};

	// Handler para enviar mensaje de contacto
	const handleSendMessage = async (message) => {
		try {
			const token = localStorage.getItem("token");
			const userId = freelancerDetails.id;

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
				throw new Error(
					"Debes iniciar sesión para contactar con el freelancer"
				);
			}

			// Validar userId
			if (!userId) {
				throw new Error(
					"No se puede contactar con este freelancer. ID de usuario no disponible."
				);
			}

			// Usar el mismo servicio de contacto que services, pasando el freelancer ID como providerId
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

	// Handler para cerrar con ESC
	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			onClose();
		}
	};

	// Handler para contratar freelancer
	const handleHireFreelancer = () => {
		const token = localStorage.getItem("token");

		// Validar token
		if (!token || token === "null" || token === "undefined") {
			setResultData({
				type: "error",
				title: "Error de Autenticación",
				message: "Debes iniciar sesión para contratar este freelancer.",
				freelancerData: null,
			});
			setIsResultModalOpen(true);
			return;
		}

		// Validar freelancerId
		if (!freelancerDetails.id) {
			setResultData({
				type: "error",
				title: "Error",
				message:
					"ID del freelancer no disponible. Por favor, inténtalo de nuevo.",
				freelancerData: null,
			});
			setIsResultModalOpen(true);
			return;
		}

		// Abrir modal de confirmación
		setIsHireModalOpen(true);
	};

	// Handler para confirmar la contratación
	const handleConfirmHire = async () => {
		try {
			setIsProcessing(true);
			const token = localStorage.getItem("token");
			const freelancerId = freelancerDetails.id;

			console.log("🤝 Intentando contratar freelancer:", freelancerId);

			// Simular contratación de freelancer (ajusta según tu API)
			// Puedes usar el endpoint de contacto con un mensaje especial de contratación
			const hiringMessage = `I would like to hire you for a project. My rate budget is $${freelancerDetails.hourly_rate}/hour. Please contact me to discuss the details.`;

			const response = await sendContactRequest(
				freelancerId,
				hiringMessage,
				token
			);

			// Cerrar modal de confirmación
			setIsHireModalOpen(false);
			setIsProcessing(false);

			// Mostrar resultado exitoso
			setResultData({
				type: "success",
				title: "¡Solicitud de Contratación Enviada!",
				message:
					"Tu solicitud de contratación ha sido enviada al freelancer. Te contactarán pronto para discutir los detalles del proyecto.",
				freelancerData: {
					id: Date.now(),
					name: freelancerDetails.name,
					hourly_rate: freelancerDetails.hourly_rate,
				},
			});
			setIsResultModalOpen(true);
		} catch (error) {
			console.error("Error hiring freelancer:", error);
			setIsProcessing(false);
			setIsHireModalOpen(false);

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
				title: "Error al Enviar Solicitud",
				message: errorMessage,
				freelancerData: null,
			});
			setIsResultModalOpen(true);
		}
	};

	return {
		// Estados
		isContactModalOpen,
		isHireModalOpen,
		isResultModalOpen,
		resultData,
		isProcessing,
		freelancerDetails,
		loadingDetails,

		// Setters
		setIsContactModalOpen,
		setIsHireModalOpen,
		setIsResultModalOpen,

		// Handlers
		handleContactFreelancer,
		handleSendMessage,
		handleHireFreelancer,
		handleConfirmHire,
		handleKeyDown,
	};
};
