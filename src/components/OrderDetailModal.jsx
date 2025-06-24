import React, { useState, useContext, useEffect } from "react";
import { FiX, FiCheck, FiClock, FiDollarSign, FiUser, FiPackage, FiMessageCircle } from "react-icons/fi";
import { AuthContext } from "../context/AuthContextProvider";
import { acceptOrder, updateOrder, deliverOrder } from "../services/orders/ordersService";
import { sendContactRequest } from "../services/contact/sendContactRequestService";
import toast from "react-hot-toast";

const OrderDetailModal = ({ isOpen, onClose, order, onOrderUpdate }) => {
	// ✅ TODOS LOS HOOKS AL PRINCIPIO
	const authContext = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [deliveryUrl, setDeliveryUrl] = useState("");
	const [showDeliveryForm, setShowDeliveryForm] = useState(false);
	const [showMessageForm, setShowMessageForm] = useState(false);
	const [messageText, setMessageText] = useState("");
	const [freelancerData, setFreelancerData] = useState(null);
	const [loadingFreelancer, setLoadingFreelancer] = useState(false);

	// Extraer user y token del contexto
	const user = authContext?.userLogged;
	const token = authContext?.token;

	// Determinar rol del usuario logueado
	const isFreelancer = user?.role === "freelancer";
	const isClient = user?.role === "client" || user?.role === "cliente";

	// Obtener datos del freelancer si es cliente
	useEffect(() => {
		const fetchFreelancerData = async () => {
			if (!order) {
				setFreelancerData(null);
				return;
			}

			if (isClient && order.freelancer_id) {
				try {
					setLoadingFreelancer(true);
					const response = await fetch(`http://localhost:3000/users/freelancers/${order.freelancer_id}`);
					if (!response.ok) {
						throw new Error(`Error ${response.status}: ${response.statusText}`);
					}
					const data = await response.json();
					setFreelancerData(data.data || data);
				} catch (error) {
					console.error("❌ Error al obtener freelancer:", error);
					setFreelancerData(null);
				} finally {
					setLoadingFreelancer(false);
				}
			}
		};

		if (isOpen && order) {
			fetchFreelancerData();
		} else {
			setFreelancerData(null);
			setLoadingFreelancer(false);
		}
	}, [isOpen, order?.id, order?.freelancer_id, isClient]);

	// Reset states when modal closes
	useEffect(() => {
		if (!isOpen) {
			setShowDeliveryForm(false);
			setShowMessageForm(false);
			setMessageText("");
			setDeliveryUrl("");
			setLoading(false);
		}
	}, [isOpen]);

	// ✅ EARLY RETURNS
	if (!isOpen || !order) {
		return null;
	}

	const getStatusInfo = (status) => {
		const statusMap = {
			pending: { 
				label: "Pendiente", 
				color: "text-yellow-400", 
				bgColor: "bg-yellow-400/20",
				icon: FiClock 
			},
			accepted: { 
				label: "Aceptada", 
				color: "text-green-400", 
				bgColor: "bg-green-400/20",
				icon: FiCheck 
			},
			in_progress: { 
				label: "En Progreso", 
				color: "text-blue-400", 
				bgColor: "bg-blue-400/20",
				icon: FiPackage 
			},
			delivered: { 
				label: "Entregada", 
				color: "text-purple-400", 
				bgColor: "bg-purple-400/20",
				icon: FiPackage 
			},
			completed: { 
				label: "Completada", 
				color: "text-green-500", 
				bgColor: "bg-green-500/20",
				icon: FiCheck 
			}
		};
		return statusMap[status] || statusMap.pending;
	};

	const statusInfo = getStatusInfo(order.status);
	const StatusIcon = statusInfo.icon;

	const handleAcceptOrder = async () => {
		try {
			setLoading(true);
			await acceptOrder(order.id, token);
			toast.success("Orden aceptada y en progreso");
			
			// Crear la orden actualizada - va directo a 'in_progress'
			const updatedOrder = {
				...order,
				status: 'in_progress',
				updated_at: new Date().toISOString()
			};
			
			onOrderUpdate?.(updatedOrder);
			onClose();
		} catch (error) {
			console.error("Error al aceptar orden:", error);
			toast.error(error.message || "Error al aceptar la orden");
		} finally {
			setLoading(false);
		}
	};

	const handleDeliverOrder = async (e) => {
		e.preventDefault();
		if (!deliveryUrl.trim()) {
			toast.error("Por favor ingresa la URL de entrega");
			return;
		}

		try {
			setLoading(true);
			await deliverOrder(order.id, deliveryUrl.trim(), token);
			toast.success("Orden marcada como entregada");
			
			const updatedOrder = {
				...order,
				status: 'delivered',
				delivery_url: deliveryUrl.trim(),
				updated_at: new Date().toISOString()
			};
			
			onOrderUpdate?.(updatedOrder);
			setShowDeliveryForm(false);
			setDeliveryUrl("");
			onClose();
		} catch (error) {
			console.error("Error al entregar orden:", error);
			toast.error(error.message || "Error al marcar orden como entregada");
		} finally {
			setLoading(false);
		}
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!messageText.trim()) {
			toast.error("Por favor escribe un mensaje");
			return;
		}

		try {
			setLoading(true);
			const freelancerId = order.freelancer_id || order.provider_id;
			
			if (!freelancerId) {
				throw new Error("No se pudo identificar al freelancer");
			}
			
			await sendContactRequest(freelancerId, messageText.trim(), token);
			toast.success("Mensaje enviado exitosamente");
			setShowMessageForm(false);
			setMessageText("");
		} catch (error) {
			console.error("Error al enviar mensaje:", error);
			toast.error(error.message || "Error al enviar el mensaje");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="bg-gray-800/95 backdrop-blur-md rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-700/50">
					<div className="flex items-center gap-3">
						<div className={`p-2 rounded-full ${statusInfo.bgColor}`}>
							<StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
						</div>
						<div>
							<h2 className="text-xl font-bold text-white">
								Orden #{order.id}
							</h2>
							<div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
								{statusInfo.label}
							</div>
						</div>
					</div>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-full"
					>
						<FiX className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					{/* Service Details */}
					<div className="bg-gray-700/30 rounded-xl p-4">
						<h3 className="text-white font-semibold mb-3 flex items-center gap-2">
							<FiPackage className="w-4 h-4" />
							Detalles del Servicio
						</h3>
						<p className="text-gray-300 text-lg font-medium">
							{order.service_title || order.title || "Identidad corporativa completa"}
						</p>
						<p className="text-gray-400 text-sm mt-1">
							{order.service_description || order.description || "Servicio profesional"}
						</p>
					</div>

					{/* Client Info - Solo para freelancers */}
					{isFreelancer && (
						<div className="bg-gray-700/30 rounded-xl p-4">
							<h3 className="text-white font-semibold mb-3 flex items-center gap-2">
								<FiUser className="w-4 h-4" />
								Cliente que realizó la orden
							</h3>
							<p className="text-gray-300 text-lg font-medium">
								{order.client_name && order.client_lastName 
									? `${order.client_name} ${order.client_lastName}`
									: order.client_name || order.clientName || "Cliente desconocido"
								}
							</p>
							{(order.client_email || order.clientEmail) && (
								<p className="text-gray-400 text-sm mt-1">
									{order.client_email || order.clientEmail}
								</p>
							)}
						</div>
					)}

					{/* Freelancer Info - Solo para clientes */}
					{isClient && (
						<div className="bg-gray-700/30 rounded-xl p-4">
							<h3 className="text-white font-semibold mb-3 flex items-center gap-2">
								<FiUser className="w-4 h-4" />
								Freelancer asignado
							</h3>
							{loadingFreelancer ? (
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
									<span className="text-gray-400">Cargando información...</span>
								</div>
							) : (
								<>
									<p className="text-gray-300 text-lg font-medium">
										{freelancerData ? 
											`${freelancerData.name || ""} ${freelancerData.lastName || ""}`.trim() || `Freelancer ID: ${order.freelancer_id}`
											: `Freelancer ID: ${order.freelancer_id || "No disponible"}`
										}
									</p>
									<p className="text-gray-400 text-sm mt-1">
										{freelancerData?.email || "Email no disponible"}
									</p>
								</>
							)}
							
							{/* Botón para enviar mensaje */}
							<div className="mt-3 flex gap-2">
								<button
									onClick={() => setShowMessageForm(true)}
									disabled={loadingFreelancer || !freelancerData}
									className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-all duration-200 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<FiMessageCircle className="w-4 h-4" />
									Enviar mensaje
								</button>
							</div>
						</div>
					)}

					{/* Important Dates */}
					<div className="bg-gray-700/30 rounded-xl p-4">
						<h3 className="text-white font-semibold mb-3 flex items-center gap-2">
							<FiClock className="w-4 h-4" />
							Fechas Importantes
						</h3>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-400">Fecha de orden:</span>
								<span className="text-gray-300">
									{order.created_at ? new Date(order.created_at).toLocaleDateString('es-ES', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit'
									}) : "23/06/2025, 20:57"}
								</span>
							</div>
							{order.updated_at && (
								<div className="flex justify-between">
									<span className="text-gray-400">Última actualización:</span>
									<span className="text-gray-300">
										{new Date(order.updated_at).toLocaleDateString('es-ES', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit'
										})}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Payment Info */}
					<div className="bg-gray-700/30 rounded-xl p-4">
						<h3 className="text-white font-semibold mb-3 flex items-center gap-2">
							<FiDollarSign className="w-4 h-4" />
							Información de Pago
						</h3>
						<div className="flex justify-between items-center">
							<span className="text-gray-400">Total:</span>
							<span className="text-2xl font-bold text-green-400">
								${order.total_amount || order.amount || order.total_price || order.service_price || order.price || "N/A"} USD
							</span>
						</div>
					</div>

					{/* Delivery URL if exists */}
					{order.delivery_url && (
						<div className="bg-gray-700/30 rounded-xl p-4">
							<h3 className="text-white font-semibold mb-3">URL de Entrega</h3>
							<a
								href={order.delivery_url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-purple-400 hover:text-purple-300 underline break-all"
							>
								{order.delivery_url}
							</a>
						</div>
					)}
				</div>

				{/* Actions */}
				<div className="border-t border-gray-700/50 p-6">
					{/* Para freelancers */}
					{isFreelancer && (
						<div className="space-y-3">
							{order.status === "pending" && (
								<button
									onClick={handleAcceptOrder}
									disabled={loading}
									className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
								>
									{loading ? (
										<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
									) : (
										<FiCheck className="w-5 h-5" />
									)}
									{loading ? "Aceptando..." : "Aceptar y Comenzar"}
								</button>
							)}

							{order.status === "in_progress" && (
								<>
									{!showDeliveryForm ? (
										<button
											onClick={() => setShowDeliveryForm(true)}
											className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
										>
											Marcar como Entregada
										</button>
									) : (
										<form onSubmit={handleDeliverOrder} className="space-y-3">
											<div>
												<label className="block text-sm font-medium text-gray-300 mb-2">
													URL de entrega (requerida):
												</label>
												<input
													type="url"
													value={deliveryUrl}
													onChange={(e) => setDeliveryUrl(e.target.value)}
													placeholder="https://..."
													className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
													required
												/>
											</div>
											<div className="flex gap-2">
												<button
													type="submit"
													disabled={loading || !deliveryUrl.trim()}
													className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
												>
													{loading ? "Entregando..." : "Confirmar Entrega"}
												</button>
												<button
													type="button"
													onClick={() => {
														setShowDeliveryForm(false);
														setDeliveryUrl("");
													}}
													className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
												>
													Cancelar
												</button>
											</div>
										</form>
									)}
								</>
							)}
						</div>
					)}

					{/* Message Form */}
					{showMessageForm && (
						<div className="mt-4 p-4 bg-gray-700/30 rounded-xl">
							<h4 className="text-white font-semibold mb-3">Enviar Mensaje</h4>
							<form onSubmit={handleSendMessage} className="space-y-3">
								<textarea
									value={messageText}
									onChange={(e) => setMessageText(e.target.value)}
									placeholder="Escribe tu mensaje aquí..."
									className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
									required
								/>
								<div className="flex gap-2">
									<button
										type="submit"
										disabled={loading || !messageText.trim()}
										className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
									>
										{loading ? "Enviando..." : "Enviar Mensaje"}
									</button>
									<button
										type="button"
										onClick={() => {
											setShowMessageForm(false);
											setMessageText("");
										}}
										className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
									>
										Cancelar
									</button>
								</div>
							</form>
						</div>
					)}

					{/* No hay acciones disponibles */}
					{!isFreelancer && !isClient && (
						<p className="text-center text-gray-400">
							No hay acciones disponibles para esta orden
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrderDetailModal;