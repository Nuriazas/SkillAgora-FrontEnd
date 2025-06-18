import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../shared/UI";
import { Select, Button } from "../shared/UI";

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  filterSpecialty,
  setFilterSpecialty,
  sortBy,
  setSortBy,
  specialties,
  viewMode,
  setViewMode,
}) => {
  const { t } = useTranslation();

  // Debounce para la búsqueda
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
    },
    [setSearchTerm]
  );

  // Manejo de cambios en los filtros
  const handleSpecialtyChange = useCallback(
    (e) => {
      setFilterSpecialty(e.target.value);
    },
    [setFilterSpecialty]
  );

  const handleSortChange = useCallback(
    (e) => {
      setSortBy(e.target.value);
    },
    [setSortBy]
  );

  // Toggle de vista
  const toggleViewMode = useCallback(() => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  }, [setViewMode]);

  return (
    <div className="w-full max-w-6xl px-4 mb-8 z-30">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Input
          type="text"
          placeholder={t("search.placeholder")}
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label={t("search.searchFreelancers")}
          className="bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText placeholder-lightGrayText dark:placeholder-darkGrayText focus:ring-lightBlue dark:focus:ring-darkBlue"
        />
        <Select
          value={filterSpecialty}
          onChange={handleSpecialtyChange}
          aria-label={t("search.filterBySpecialty")}
          className="bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText focus:ring-lightBlue dark:focus:ring-darkBlue"
        >
          <option value="">{t("search.allSpecialties")}</option>
          {specialties?.map((specialty) => (
            <option key={specialty} value={specialty}>
              {t(`freelancers.specialties.${specialty}`)}
            </option>
          ))}
        </Select>
        <Select
          value={sortBy}
          onChange={handleSortChange}
          aria-label={t("search.sortBy")}
          className="bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText focus:ring-lightBlue dark:focus:ring-darkBlue"
        >
          <option value="rating">{t("search.sortByRating")}</option>
          <option value="price">{t("search.sortByPrice")}</option>
        </Select>
        <Button
          onClick={toggleViewMode}
          aria-label={t(
            `search.viewMode.${viewMode === "grid" ? "list" : "grid"}`
          )}
          className="bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-lightBlue dark:focus:ring-darkBlue"
        >
          {viewMode === "grid" ? "📋" : "🔲"}
        </Button>
      </div>
    </div>
  );
};
