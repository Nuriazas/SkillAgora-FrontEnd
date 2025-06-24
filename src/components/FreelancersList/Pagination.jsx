import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../shared/UI";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const handlePreviousPage = useCallback(() => {
    onPageChange(Math.max(1, currentPage - 1));
  }, [currentPage, onPageChange]);

  const handleNextPage = useCallback(() => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  }, [currentPage, totalPages, onPageChange]);

  return (
    <nav
      className="flex justify-center gap-2 mt-8"
      aria-label={t("pagination.navigation")}
    >
      <Button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="disabled:opacity-50 disabled:cursor-not-allowed bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-lightBlue dark:focus:ring-darkBlue"
        aria-label={t("pagination.previous")}
      >
        {t('pagination.previous')}
      </Button>
      <span
        className="px-4 py-2 text-lightText dark:text-darkText"
        aria-current="page"
      >
        {t("pagination.pageInfo", { current: currentPage, total: totalPages })}
      </span>
      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50 disabled:cursor-not-allowed bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-lightBlue dark:focus:ring-darkBlue"
        aria-label={t("pagination.next")}
      >
        {t('pagination.next')}
      </Button>
    </nav>
  );
};
