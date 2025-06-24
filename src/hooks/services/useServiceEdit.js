import { useState, useEffect } from 'react';


// hook para manejar la edición de servicios
export const useServiceEdit = (service, isOpen) => {	// recibe el servicio y si el modal esta abierto como args
	const [loading, setLoading] = useState(false);	// estado de carga
	const [categories, setCategories] = useState([]);	// categorias disponibles
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: "",
		delivery_time_days: "",
		place: "",
		category_id: "",
	});

	useEffect(() => {
		if (isOpen && service) {
			console.log("Opening edit modal for service:", service);
			setFormData({
				title: service.title || "",
				description: service.description || "",
				price: service.price?.toString() || "",
				delivery_time_days: service.delivery_time_days?.toString() || "",
				place: service.place || "",
				category_id: service.category_id || "",
			});
			loadCategories();
		}
	}, [isOpen, service]);

	const loadCategories = async () => {
		try {
			const response = await fetch("http://localhost:3000/services/categories");
			const data = await response.json();
			if (data.success) {
				setCategories(data.data);
			}
		} catch (error) {
			console.error("Error loading categories:", error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return {
		loading,
		setLoading,
		categories,
		formData,
		setFormData,
		loadCategories,
		handleChange
	};
};