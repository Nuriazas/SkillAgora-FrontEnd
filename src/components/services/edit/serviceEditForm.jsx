import React from 'react';
import { FiSave, FiLoader } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import FormField from './FormField';
import CategorySelect from './CategorySelect';

const ServiceEditForm = ({ 
	formData, 
	categories, 
	loading, 
	service, 
	onSubmit, 
	onChange, 
	onClose 
}) => {
	const { t } = useTranslation();

	return (
		<form onSubmit={onSubmit} className="p-6 space-y-6">
			<FormField
				label={t('serviceEditModal.serviceTitle')}
				name="title"
				type="text"
				value={formData.title}
				onChange={onChange}
				required
				placeholder={t('serviceEditModal.serviceTitlePlaceholder')}
			/>

			<FormField
				label={t('serviceEditModal.description')}
				name="description"
				type="textarea"
				value={formData.description}
				onChange={onChange}
				required
				rows={4}
				placeholder={t('serviceEditModal.descriptionPlaceholder')}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<FormField
					label={t('serviceEditModal.price')}
					name="price"
					type="number"
					value={formData.price}
					onChange={onChange}
					required
					min="0"
					step="0.01"
					placeholder={t('serviceEditModal.pricePlaceholder')}
				/>

				<FormField
					label={t('serviceEditModal.deliveryTime')}
					name="delivery_time_days"
					type="number"
					value={formData.delivery_time_days}
					onChange={onChange}
					min="1"
					placeholder={t('serviceEditModal.deliveryTimePlaceholder')}
				/>
			</div>

			<FormField
				label={t('serviceEditModal.location')}
				name="place"
				type="text"
				value={formData.place}
				onChange={onChange}
				placeholder={t('serviceEditModal.locationPlaceholder')}
			/>

			<CategorySelect
				value={formData.category_id}
				categories={categories}
				onChange={onChange}
			/>

			<div className="text-xs text-gray-500 bg-gray-800/30 p-2 rounded">
				{t('serviceEditModal.serviceId', { id: service?.id || t('serviceEditModal.missing') })}
			</div>

			<div className="flex gap-3 justify-end pt-6 border-t border-gray-800/50">
				<button
					type="button"
					onClick={onClose}
					className="px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 font-medium border border-gray-600/50"
					disabled={loading}
				>
					{t('serviceEditModal.cancel')}
				</button>
				<button
					type="submit"
					disabled={loading}
					className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? (
						<>
							<FiLoader className="w-4 h-4 animate-spin" />
							{t('serviceEditModal.updating')}
						</>
					) : (
						<>
							<FiSave className="w-4 h-4" />
							{t('serviceEditModal.updateService')}
						</>
					)}
				</button>
			</div>
		</form>
	);
};

export default ServiceEditForm;