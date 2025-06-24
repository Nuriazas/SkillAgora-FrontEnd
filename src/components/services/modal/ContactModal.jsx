import React, { useEffect, useState } from "react";
import { FiX, FiSend } from "react-icons/fi";
import ContactSuccessModal from "./ContactSuccessModal.jsx";

// Modal para contactar al proveedor de un servicio
const ContactModal = ({ isOpen, onClose, service, onSendMessage }) => {	// Props del componente
	const [message, setMessage] = useState("");	// Estado para el mensaje del modal
	const [isLoading, setIsLoading] = useState(false);	// Estado para controlar el loading al enviar el mensaje
	const [showSuccessModal, setShowSuccessModal] = useState(false);	// Estado para mostrar el modal de éxito
	const [providerName, setProviderName] = useState("");	// Estado para el nombre del proveedor

	useEffect(() => {	// Efecto para actualizar el mensaje inicial cuando se abre el modal
		if (isOpen) {
			setMessage(`Hey, I'm interested in your service: ${service.title}`);
		}
	}, [isOpen, service.title]);

	const handleSubmit = async (e) => {	// Handler para enviar el mensaje
		e.preventDefault();
		if (!message.trim()) return;	

		setIsLoading(true);	// Inicia el loading al enviar el mensaje

		try {
			const response = await onSendMessage(message.trim());	// Llama a la función onSendMessage pasandole el mensaje como prop

			const responseProviderName =
				response?.data?.providerName || service.user_name;	// Obtiene el nombre del proveedor de la respuesta o usa el nombre del servicio
			setProviderName(responseProviderName);	// Actualiza el estado del nombre del proveedor

			onClose();
			setMessage("");
			setShowSuccessModal(true);
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			onClose();
		}
	};

	const handleCloseSuccess = () => {
		setShowSuccessModal(false);
		setProviderName("");
	};

	if (!isOpen)
		return (
			<>
				<ContactSuccessModal
					isOpen={showSuccessModal}
					onClose={handleCloseSuccess}
					providerName={providerName}
				/>
			</>
		);

	return (	// Renderiza el modal de contacto
		<>
			<div
				className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]"
				onClick={(e) => e.target === e.currentTarget && onClose()}
			>
				<div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-md w-full border border-gray-800/50 shadow-2xl">
					<div className="flex items-center justify-between p-6 border-b border-gray-800/50">
						<h3 className="text-xl font-semibold text-white">
							Contactar con {service.user_name}
						</h3>
						<button
							onClick={onClose}
							className="bg-gray-800/90 hover:bg-gray-700/90 p-2 rounded-full transition-colors"
							disabled={isLoading}
						>
							<FiX className="w-5 h-5 text-gray-300" />
						</button>
					</div>

					<form onSubmit={handleSubmit} className="p-6">
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Mensaje
							</label>
							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Escribe tu mensaje aquí..."
								rows={4}
								className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
								disabled={isLoading}
								required
							/>
						</div>

						<div className="flex gap-3 justify-end">
							<button
								type="button"
								onClick={onClose}
                                onKeyDown={handleKeyDown}
								className="px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 font-medium border border-gray-600/50"
								disabled={isLoading}
							>
								Cancelar
							</button>
							<button
								type="submit"
								disabled={isLoading || !message.trim()}
								className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? (	// Muestra un spinner y texto de "Enviando..." si está en loading
									<>
										<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>	
										Enviando...	
									</>
								) : (	// Muestra el icono de enviar y texto de "Enviar Mensaje" si no está en loading
									<>
										<FiSend className="w-4 h-4" />
										Enviar Mensaje
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>

			<ContactSuccessModal	// Renderiza el modal de éxito al enviar el mensaje
				isOpen={showSuccessModal}
				onClose={handleCloseSuccess}
				onKeyDown={handleKeyDown}
				providerName={providerName}
			/>
		</>
	);
};

export default ContactModal;