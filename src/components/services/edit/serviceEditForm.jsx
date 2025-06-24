import React from 'react';
import { FiSave, FiLoader } from "react-icons/fi";
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
	return (
		<form onSubmit={onSubmit} className="p-6 space-y-6">
			<FormField
				label="Service Title"
				name="title"
				type="text"
				value={formData.title}
				onChange={onChange}
				required
				placeholder="Enter service title"
			/>

			<FormField
				label="Description"
				name="description"
				type="textarea"
				value={formData.description}
				onChange={onChange}
				required
				rows={4}
				placeholder="Describe your service"
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<FormField
					label="Price ($)"
					name="price"
					type="number"
					value={formData.price}
					onChange={onChange}
					required
					min="0"
					step="0.01"
					placeholder="0.00"
				/>

				<FormField
					label="Delivery Time (days)"
					name="delivery_time_days"
					type="number"
					value={formData.delivery_time_days}
					onChange={onChange}
					min="1"
					placeholder="3"
				/>
			</div>

			<FormField
				label="Location"
				name="place"
				type="text"
				value={formData.place}
				onChange={onChange}
				placeholder="Remote, City, etc."
			/>

			<CategorySelect
				value={formData.category_id}
				categories={categories}
				onChange={onChange}
			/>

			<div className="text-xs text-gray-500 bg-gray-800/30 p-2 rounded">
				Service ID: {service?.id || "MISSING"}
			</div>

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
	);
};

export default ServiceEditForm;