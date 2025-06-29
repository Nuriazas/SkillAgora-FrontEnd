import React, { useState, useContext } from "react";
import { FiX, FiSend, FiUser, FiMail, FiClock } from "react-icons/fi";
import { AuthContext } from "../context/AuthContextProvider";
import { replyToMessage } from "../services/contact/replyToMessageService.js";
import toast from "react-hot-toast";

/**
 * Modal de detalle de un mensaje con opción de responder
 */
const MessageDetailModal = ({ message, isOpen, onClose, onMessageUpdate }) => {
	const { token } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [replyMessage, setReplyMessage] = useState("");
	const [showReplyForm, setShowReplyForm] = useState(false);

	if (!isOpen || !message) return null;

	// Formatear fecha
	const formatDate = (dateString) => {
		if (!dateString) return "Sin fecha";
		return new Date(dateString).toLocaleString("es-ES", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const handleSendReply = async () => {
		if (!replyMessage.trim()) {
			toast.error("Por favor, escribe un mensaje");
			return;
		}

		if (!message.id) {
			toast.error("Error: ID de mensaje no disponible");
			return;
		}

		try {
			setLoading(true);
			
			const result = await replyToMessage(message.id, replyMessage.trim(), token);
			
			toast.success(`Respuesta enviada a ${result.data?.recipientName || 'el usuario'}`);
			
			setReplyMessage("");
			setShowReplyForm(false);
			
			onClose();
		} catch (error) {
			console.error("❌ Error al enviar respuesta:", error);
			toast.error(error.message || "Error al enviar la respuesta");
		} finally {
			setLoading(false);
		}
	};

	const getSenderInfo = () => {
		const senderName = message.senderName && message.senderLastName 
			? `${message.senderName} ${message.senderLastName}`
			: message.senderName || "Usuario desconocido";
		
		return {
			name: senderName,
			email: message.senderEmail || "Sin email",
			avatar: message.senderAvatar || null
		};
	};

	const senderInfo = getSenderInfo();

	return (
		<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800/50 shadow-2xl">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-800/50">
					<h2 className="text-2xl font-semibold text-white">
						Mensaje de Contacto
					</h2>
					<button
						onClick={onClose}
						className="bg-gray-800/90 hover:bg-gray-700/90 p-2 rounded-full transition-colors"
					>
						<FiX className="w-5 h-5 text-gray-300" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					{/* Información del remitente */}
					<div className="bg-gray-800/30 rounded-xl p-4">
						<div className="flex items-center space-x-4">
							{/* Avatar */}
							<div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
								{senderInfo.avatar ? (
									<img
										src={senderInfo.avatar}
										alt={senderInfo.name}
										className="w-full h-full rounded-full object-cover"
									/>
								) : (
									<span className="text-white font-bold text-lg">
										{senderInfo.name.charAt(0).toUpperCase()}
									</span>
								)}
							</div>

							{/* Info del remitente */}
							<div className="flex-1">
								<div className="flex items-center space-x-2 mb-2">
									<FiUser className="w-5 h-5 text-purple-400" />
									<h3 className="font-semibold text-white text-lg">
										{senderInfo.name}
									</h3>
								</div>
								
								{senderInfo.email !== "Sin email" && (
									<div className="flex items-center space-x-2 mb-2">
										<FiMail className="w-4 h-4 text-gray-400" />
										<span className="text-gray-300 text-sm">{senderInfo.email}</span>
									</div>
								)}

								<div className="flex items-center space-x-2">
									<FiClock className="w-4 h-4 text-gray-400" />
									<span className="text-gray-400 text-sm">
										{formatDate(message.createdAt)}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Mensaje original */}
					<div className="bg-gray-800/30 rounded-xl p-4">
						<h4 className="font-semibold text-white mb-3">Mensaje:</h4>
						<div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-purple-500">
							<p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
								{message.content || "Sin contenido"}
							</p>
						</div>
					</div>

					{/* Información adicional */}
					{message.service_title && (
						<div className="bg-gray-800/30 rounded-xl p-4">
							<h4 className="font-semibold text-white mb-2">Servicio relacionado:</h4>
							<p className="text-gray-300">{message.service_title}</p>
						</div>
					)}

					{/* Botón para mostrar formulario de respuesta */}
					{!showReplyForm && (
						<div className="flex justify-center">
							<button
								onClick={() => setShowReplyForm(true)}
								className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
							>
								<FiSend className="w-5 h-5" />
								Responder Mensaje
							</button>
						</div>
					)}

					{/* Formulario de respuesta */}
					{showReplyForm && (
						<div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
							<h4 className="font-semibold text-white mb-4">Responder a {senderInfo.name}:</h4>
							
							<div className="space-y-4">
								<textarea
									value={replyMessage}
									onChange={(e) => setReplyMessage(e.target.value)}
									placeholder="Escribe tu respuesta aquí..."
									rows={4}
									className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
									disabled={loading}
								/>

								<div className="flex gap-3 justify-end">
									<button
										onClick={() => {
											setShowReplyForm(false);
											setReplyMessage("");
										}}
										className="px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 font-medium border border-gray-600/50"
										disabled={loading}
									>
										Cancelar
									</button>
									
									<button
										onClick={handleSendReply}
										disabled={loading || !replyMessage.trim() || !message.id}
										className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{loading ? (
											<>
												<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
												Enviando...
											</>
										) : (
											<>
												<FiSend className="w-4 h-4" />
												Enviar Respuesta
											</>
										)}
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MessageDetailModal;