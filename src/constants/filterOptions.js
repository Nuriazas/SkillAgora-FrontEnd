/**
 * Opciones de filtrado para servicios
 */

// Rangos de precios disponibles para filtrar
export const PRICE_RANGES = [
	{ label: "Cualquier precio", value: "" },
	{ label: "Menor a $50", value: "0-50" },
	{ label: "$50 - $200", value: "50-200" },
	{ label: "$200 - $500", value: "200-500" },
	{ label: "Mayor a $500", value: "500-" },
];

// Opciones de ordenamiento
export const SORT_OPTIONS = [
	{ label: "Más recientes", value: "created_at-DESC" },
	{ label: "Más antiguos", value: "created_at-ASC" },
	{ label: "Precio: menor a mayor", value: "price-ASC" },
	{ label: "Precio: mayor a menor", value: "price-DESC" },
	{ label: "Mejor valorados", value: "rating-DESC" },
	{ label: "Más populares", value: "views-DESC" },
];
