import React from 'react';
import { useTranslation } from "react-i18next";

const CategorySelect = ({ value, categories, onChange }) => {
	const { t } = useTranslation();

	return (
		<div>
			<label className="block text-sm font-medium text-gray-300 mb-2">
				{t('serviceEditModal.category')}
			</label>
			<select
				name="category_id"
				value={value}
				onChange={onChange}
				className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
			>
				<option value="">{t('serviceEditModal.selectCategory')}</option>
				{categories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name} ({category.total_services} {t('serviceEditModal.services')})
					</option>
				))}
			</select>
		</div>
	);
};

export default CategorySelect;