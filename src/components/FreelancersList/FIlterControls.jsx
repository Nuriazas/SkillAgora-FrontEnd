import { useTranslation } from "react-i18next";

const FilterControls = ({ filters, onFilterChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-4">
      <label className="block text-gray-300 mb-2" htmlFor="category">
        {t('filterControls.category')}
      </label>
      <label className="block text-gray-300 mb-2" htmlFor="location">
        {t('filterControls.location')}
      </label>
      <label className="block text-gray-300 mb-2" htmlFor="rate">
        {t('filterControls.rate')}
      </label>
      <button
        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded hover:from-green-700 hover:to-emerald-700 transition-colors"
        onClick={() => onFilterChange({})}
      >
        {t('filterControls.clear')}
      </button>
    </div>
  );
};

export default FilterControls; 