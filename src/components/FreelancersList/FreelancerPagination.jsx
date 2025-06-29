import React, { useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";

/**
 * Componente de paginación con estilo consistente
 */
const FreelancerPagination = ({ currentPage, totalPages, onPageChange }) => {
	const { t } = useTranslation();

	if (totalPages <= 1) return null;

	const handlePreviousPage = useCallback(() => {
		onPageChange(Math.max(1, currentPage - 1));
	}, [currentPage, onPageChange]);

	const handleNextPage = useCallback(() => {
		onPageChange(Math.min(totalPages, currentPage + 1));
	}, [currentPage, totalPages, onPageChange]);

	const handlePageClick = useCallback(
		(page) => {
			onPageChange(page);
		},
		[onPageChange]
	);

	// Generar números de página a mostrar
	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;
		let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
		let end = Math.min(totalPages, start + maxVisible - 1);

		// Ajustar el inicio si llegamos al final
		if (end - start < maxVisible - 1) {
			start = Math.max(1, end - maxVisible + 1);
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<nav
			className="flex justify-center items-center gap-2 mt-8"
			aria-label="Pagination navigation"
		>
			{/* Botón anterior */}
			<button
				onClick={handlePreviousPage}
				disabled={currentPage === 1}
				className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900/80 disabled:hover:text-gray-300"
				aria-label="Previous page"
			>
				<FiChevronLeft className="w-4 h-4" />
				<span className="hidden sm:inline">{t('freelancerPagination.previous')}</span>
			</button>

			{/* Números de página */}
			<div className="flex gap-1">
				{/* Primera página si no está visible */}
				{pageNumbers[0] > 1 && (
					<>
						<button
							onClick={() => handlePageClick(1)}
							className="w-10 h-10 flex items-center justify-center bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 text-sm font-medium"
						>
							1
						</button>
						{pageNumbers[0] > 2 && (
							<span className="w-10 h-10 flex items-center justify-center text-gray-500">
								...
							</span>
						)}
					</>
				)}

				{/* Páginas visibles */}
				{pageNumbers.map((page) => (
					<button
						key={page}
						onClick={() => handlePageClick(page)}
						className={`w-10 h-10 flex items-center justify-center backdrop-blur-xl border rounded-xl transition-all duration-200 text-sm font-medium ${
							page === currentPage
								? "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500/50 text-white shadow-lg hover:shadow-purple-500/25"
								: "bg-gray-900/80 border-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800/80"
						}`}
						aria-label={`Go to page ${page}`}
						aria-current={page === currentPage ? "page" : undefined}
					>
						{page}
					</button>
				))}

				{/* Última página si no está visible */}
				{pageNumbers[pageNumbers.length - 1] < totalPages && (
					<>
						{pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
							<span className="w-10 h-10 flex items-center justify-center text-gray-500">
								...
							</span>
						)}
						<button
							onClick={() => handlePageClick(totalPages)}
							className="w-10 h-10 flex items-center justify-center bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 text-sm font-medium"
						>
							{totalPages}
						</button>
					</>
				)}
			</div>

			{/* Botón siguiente */}
			<button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900/80 disabled:hover:text-gray-300"
				aria-label="Next page"
			>
				<span className="hidden sm:inline">{t('freelancerPagination.next')}</span>
				<FiChevronRight className="w-4 h-4" />
			</button>

			{/* Info de página */}
			<div className="ml-4 text-sm text-gray-400">
				{t('freelancerPagination.pageInfo', { current: currentPage, total: totalPages })}
			</div>
		</nav>
	);
};

export { FreelancerPagination };
