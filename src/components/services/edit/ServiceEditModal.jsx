import React, { useState, useContext, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { AuthContext } from "../../../context/AuthContextProvider.jsx";
import updateServiceService from "../../../services/services/updateServiceService.js";
import ServiceEditForm from "./ServiceEditForm";
import { useServiceEdit } from "../../../hooks/services/useServiceEdit.js";

const ServiceEditModal = ({ service, isOpen, onClose, onUpdate }) => {
	const { token } = useContext(AuthContext);
	const {
		loading,
		categories,
		formData,
		setFormData,
		loadCategories,
		handleChange
	} = useServiceEdit(service, isOpen);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!token) {
			alert("Authentication error: Please log in again");
			return;
		}

		if (!service || !service.service_id) {
			alert("Error: No se encontró el ID del servicio");
			return;
		}

		try {
			const dataToSend = {
				title: formData.title,
				description: formData.description,
				price: parseFloat(formData.price),
				delivery_time_days: parseInt(formData.delivery_time_days) || null,
				place: formData.place || null,
				...(formData.category_id && { category_id: parseInt(formData.category_id) }),
			};

			const response = await updateServiceService(dataToSend, service.service_id, token);
			const data = await response.json();
			
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
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800/50 shadow-2xl">
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

				<ServiceEditForm
					formData={formData}
					categories={categories}
					loading={loading}
					service={service}
					onSubmit={handleSubmit}
					onChange={handleChange}
					onClose={onClose}
				/>
			</div>
		</div>
	);
};

export default ServiceEditModal;