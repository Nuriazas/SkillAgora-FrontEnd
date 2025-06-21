import React, { useState, useContext, useEffect } from "react";
import { FiX, FiSave, FiLoader } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContextProvider";
import { getServiceById } from "../../services/api/getServiceById.js";



const ServiceEditModal = ({ service, isOpen, onClose, onUpdate }) => {
	const { token } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: "",
		delivery_time_days: "",
		place: "",
	});


	useEffect(() => {
		if (isOpen && service) {
			console.log("🧪 Recibido en Modal:", JSON.stringify(service, null, 2));

			setFormData({
				title: service.title || "",
				description: service.description || "",
				price: service.price?.toString() || "",
				delivery_time_days: service.delivery_time_days?.toString() || "",
				place: service.place || "",
			});
			loadCategories();
		}
		console.log("Service recibido en modal:", service);
	}, [isOpen, service]);

	const loadCategories = async () => {
		try {
			const response = await fetch("http://localhost:3000/services/categories");
			const data = await response.json();
			if (data.success) {
				setCategories(data.service);
			}
		} catch (error) {
			console.error("Error loading categories:", error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	
	
	const handleSave = async () => {
    try {
    const response = await apiUpdateService(serviceData); 
    if (response.success) {
      onUpdate(response.data);  
      onClose();               
    }

      if (response.success) {
        onUpdate(response.data); 
        onClose();              
      } else {
        alert("Error al actualizar el servicio");
      }
    } catch (error) {
      alert("Error al actualizar el servicio");
      console.error(error);
    }
  };
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!token) {
			alert("Authentication error: Please log in again");
			return;
		}

		// Verificamos que tengamos el servicio y su ID
		if (!service || !service.service_id) {
			alert("Error: No se encontró el ID del servicio");
			return;
		}

		setLoading(true);
		try {
			const dataToSend = {
				title: formData.title,
				description: formData.description,
				price: parseFloat(formData.price),
				delivery_time_days: parseInt(formData.delivery_time_days) || null,
				place: formData.place || null,
			};

			const response = await fetch(
				`http://localhost:3000/service/update/${service.service_id}`, // Usamos service.id directamente
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(dataToSend),
				}
			);

			const data = await response.json();
			console.log(data);
			
			if (response.ok || data.success) {
				onUpdate({
					...service,
					...data.result,
				});
				onClose();
			} else {
				throw new Error(data.message || "Error al actualizar el servicio");
			}
		} catch (error) {
			alert("Error updating service: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800/50 shadow-2xl">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-800/50">
					<h2 className="text-xl font-semibold text-white">Edit Service</h2>
					<button
						onClick={onClose}
						className="bg-gray-800/90 hover:bg-gray-700/90 p-2 rounded-full transition-colors"
						disabled={loading}
					>
						<FiX className="w-5 h-5 text-gray-300" />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{/* Title */}
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Service Title
						</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							required
							className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
							placeholder="Enter service title"
						/>
					</div>

					{/* Description */}
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Description
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							required
							rows={4}
							className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
							placeholder="Describe your service"
						/>
					</div>

					{/* Price and Delivery Time */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Price ($)
							</label>
							<input
								type="number"
								name="price"
								value={formData.price}
								onChange={handleChange}
								required
								min="0"
								step="0.01"
								className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
								placeholder="0.00"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Delivery Time (days)
							</label>
							<input
								type="number"
								name="delivery_time_days"
								value={formData.delivery_time_days}
								onChange={handleChange}
								min="1"
								className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
								placeholder="3"
							/>
						</div>
					</div>

					{/* Location */}
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Location
						</label>
						<input
							type="text"
							name="place"
							value={formData.place}
							onChange={handleChange}
							className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
							placeholder="Remote, City, etc."
						/>
					</div>

					{/* Debug info */}
					<div className="text-xs text-gray-500 bg-gray-800/30 p-2 rounded">
						Service ID: {service?.id || "MISSING"}
					</div>

					{/* Buttons */}
					<div className="flex gap-3 justify-end pt-6 border-t border-gray-800/50">
						<button
							type="button"
							onClick={onClose}
							className="px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 font-medium border border-gray-600/50"
							disabled={loading}
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading}
							className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? (
								<>
									<FiLoader className="w-4 h-4 animate-spin" />
									Updating...
								</>
							) : (
								<>
									<FiSave className="w-4 h-4" />
									Update Service
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ServiceEditModal;
