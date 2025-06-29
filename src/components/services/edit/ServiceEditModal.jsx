import React, { useState, useContext, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { AuthContext } from "../../../context/AuthContextProvider.jsx";
import updateServiceService from "../../../services/services/updateServiceService.js";
import deleteServiceService from "../../../services/services/deleteServiceService.js";
import ServiceEditForm from "./ServiceEditForm";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal.jsx";
import { useServiceEdit } from "../../../hooks/services/useServiceEdit.js";
import { useTranslation } from "react-i18next";
import ResultModal from "../modal/ResultModal.jsx";

const ServiceEditModal = ({ service, isOpen, onClose, onUpdate, onDelete }) => {
   const { token } = useContext(AuthContext);
   const { t } = useTranslation();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const [isResultModalOpen, setIsResultModalOpen] = useState(false);
   const [resultData, setResultData] = useState({
   	type: 'success',
   	title: '',
   	message: ''
   });

   const {
   	loading,
   	categories,
   	formData,
   	setFormData,
   	loadCategories,
   	handleChange
   } = useServiceEdit(service, isOpen);

   const showResult = (type, title, message) => {
   	setResultData({ type, title, message });
   	setIsResultModalOpen(true);
   };

   const handleSubmit = async (e) => {
   	e.preventDefault();

   	if (!token) {
   		showResult('error', 'Error', 'Authentication error');
   		return;
   	}

   	if (!service || !service.service_id) {
   		showResult('error', 'Error', 'Authentication error');
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
   			showResult('success', 'Success', 'Service updated successfully');
   		} else {
   			throw new Error(data.message || t('serviceEditModal.updateError'));
   		}
   	} catch (error) {
   		showResult('error', 'Error', `Error updating: ${error.message}`);
   	}
   };

   const handleDeleteClick = () => {
   	setIsDeleteModalOpen(true);
   };

   const handleDeleteConfirm = async () => {
   	if (!token) {
   		showResult('error', 'Error', 'Authentication error');
   		return;
   	}

   	if (!service || !service.service_id) {
   		showResult('error', 'Error', 'Service ID not found');
   		return;
   	}

   	try {
   		setIsDeleting(true);
   		const { response, data } = await deleteServiceService(service.service_id, token);
   		
   		if (response.ok || data.success) {
   			if (onDelete) {
   				onDelete(service.service_id);
   			}
   			setIsDeleteModalOpen(false);
   			showResult('success', 'Service Deleted', 'The service has been deleted successfully');
   		} else {
   			throw new Error(data.message || t('deleteModal.error'));
   		}
   	} catch (error) {
   		showResult('error', 'Error', `Error deleting: ${error.message}`);
   		setIsDeleteModalOpen(false);
   	} finally {
   		setIsDeleting(false);
   	}
   };

   const handleDeleteCancel = () => {
   	setIsDeleteModalOpen(false);
   };

   const handleResultModalClose = () => {
   setIsResultModalOpen(false);
   if (resultData.type === 'success') {
   	onClose();
   }
};

   if (!isOpen) return null;

   return (
   	<>
   		<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
   			<div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800/50 shadow-2xl">
   				<div className="flex items-center justify-between p-6 border-b border-gray-800/50">
   					<h2 className="text-xl font-semibold text-white">{t('serviceEditModal.editService')}</h2>
   					<button
   						onClick={onClose}
   						className="bg-gray-800/90 hover:bg-gray-700/90 p-2 rounded-full transition-colors"
   						disabled={loading || isDeleting}
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
   					onDeleteClick={handleDeleteClick}
   					isDeleting={isDeleting}
   				/>
   			</div>
   		</div>

   		{/* Modal de confirmación de eliminación */}
   		<DeleteConfirmationModal
   			isOpen={isDeleteModalOpen}
   			onClose={handleDeleteCancel}
   			onConfirm={handleDeleteConfirm}
   			loading={isDeleting}
   			serviceName={service?.title || 'Unnamed service'}
   		/>

   		{/* Modal de resultado */}
   		<ResultModal
   			isOpen={isResultModalOpen}
   			onClose={handleResultModalClose}
   			type={resultData.type}
   			title={resultData.title}
   			message={resultData.message}
   		/>
   	</>
   );
};

export default ServiceEditModal;