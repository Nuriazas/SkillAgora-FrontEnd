import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header.jsx";
import { Background } from "../components/shared/Background/index.jsx";
import { Input, Button } from "../components/shared/UI/index.jsx";
import { useFreelancersList } from "../hooks/useFreelancersList.js";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import { getCategories } from "../services/api/getFilteredServicesService.js";

const CreateServicePage = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { handleCreateService } = useFreelancersList();
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [loadingCategories, setLoadingCategories] = useState(true);
	const { token } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		category_name: "",
		title: "",
		description: "",
		price: "",
		place: "",
	});

	// Obtener categorías del backend
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await getCategories();
				setCategories(response.data);
			} catch (error) {
				console.error("Error al obtener categorías:", error);
			} finally {
				setLoadingCategories(false);
			}
		};

		fetchCategories();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			console.log("Token obtenido del contexto:", token);
			console.log("¿Existe el token?", !!token);
			console.log("Tipo de token:", typeof token);
			console.log("Longitud del token:", token?.length);
			const serviceData = {
				category_name: formData.category_name,
				title: formData.title,
				description: formData.description,
				price: formData.price,
				place: formData.place,
			};
			await handleCreateService(serviceData, token);
			navigate("/");
		} catch (error) {
			console.error("Error al crear el servicio:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-lightBackground dark:bg-darkBackground w-full flex flex-col items-center justify-start relative overflow-x-hidden">
			<Header />

			{/* Contenedor del formulario y decoraciones */}
			<div className="relative flex-1 w-full flex items-center justify-center py-8 sm:py-16">
				<Background />

				{/* Formulario principal perfectamente centrado */}
				<div className="relative z-20 w-full flex items-center justify-center">
					<div className="w-full max-w-2xl px-4">
						<h1 className="text-3xl font-bold text-lightText dark:text-darkText mb-8 text-center">
							{t("createService.title")}
						</h1>

						<form
							onSubmit={handleSubmit}
							className="space-y-6 bg-lightCard dark:bg-darkCard p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 relative"
						>
							<div>
								<label className="block text-lightText dark:text-darkText mb-2">
									{t("createService.serviceTitle")}
								</label>
								<Input
									type="text"
									name="title"
									value={formData.title}
									onChange={handleChange}
									placeholder={t("createService.serviceTitlePlaceholder")}
									required
									className="border border-gray-200 dark:border-gray-700 focus:ring-lightBlue dark:focus:ring-darkBlue bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText placeholder-lightGrayText dark:placeholder-darkGrayText"
								/>
							</div>

							<div>
								<label className="block text-lightText dark:text-darkText mb-2">
									{t("createService.description")}
								</label>
								<textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
									className="w-full px-4 py-2 rounded-lg bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText placeholder-lightGrayText dark:placeholder-darkGrayText focus:outline-none focus:ring-2 focus:ring-lightBlue dark:focus:ring-darkBlue min-h-[120px] border border-gray-200 dark:border-gray-700"
									placeholder={t("createService.descriptionPlaceholder")}
									required
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-lightText dark:text-darkText mb-2">
										{t("createService.pricePerHour")}
									</label>
									<Input
										type="number"
										name="price"
										value={formData.price}
										onChange={handleChange}
										placeholder={t("createService.pricePlaceholder")}
										required
										className="border border-gray-200 dark:border-gray-700 focus:ring-lightBlue dark:focus:ring-darkBlue bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText placeholder-lightGrayText dark:placeholder-darkGrayText"
									/>
								</div>

								<div>
									<label className="block text-lightText dark:text-darkText mb-2">
										{t("createService.category")}
									</label>
									<select
										name="category_name"
										value={formData.category_name}
										onChange={handleChange}
										className="w-full px-4 py-2 rounded-lg bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText focus:outline-none focus:ring-2 focus:ring-lightBlue dark:focus:ring-darkBlue border border-gray-200 dark:border-gray-700"
										required
										disabled={loadingCategories}
									>
										<option value="">
											{loadingCategories
												? "Cargando categorías..."
												: t("createService.selectCategory")}
										</option>
										{categories.map((category) => (
											<option key={category.id} value={category.name}>
												{category.name}
											</option>
										))}
									</select>
								</div>
							</div>

							<div>
								<label className="block text-lightText dark:text-darkText mb-2">
									{t("createService.location")}
								</label>
								<Input
									type="text"
									name="place"
									value={formData.place}
									onChange={handleChange}
									placeholder={t("createService.locationPlaceholder")}
									required
									className="border border-gray-200 dark:border-gray-700 focus:ring-lightBlue dark:focus:ring-darkBlue bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText placeholder-lightGrayText dark:placeholder-darkGrayText"
								/>
							</div>

							<div className="flex justify-end gap-4 mt-8">
								<Button
									type="button"
									onClick={() => navigate("/")}
									className="bg-lightCard hover:bg-gray-100 dark:bg-darkCard dark:text-darkText dark:hover:bg-gray-700 dark:focus:ring-darkBlue text-lightText px-6 py-3 border border-gray-200 dark:border-gray-700"
								>
									{t("createService.backToFreelancers")}
								</Button>
								<Button
									type="button"
									onClick={() => navigate(-1)}
									className="bg-lightCard hover:bg-gray-100 dark:bg-darkCard dark:text-darkText dark:hover:bg-gray-700 dark:focus:ring-darkBlue text-lightText px-6 py-3 border border-gray-200 dark:border-gray-700"
								>
									{t("createService.cancel")}
								</Button>
								<Button
									type="submit"
									disabled={isLoading || loadingCategories}
									className="bg-lightBlue hover:bg-blue-600 dark:bg-darkBlue dark:hover:bg-blue-600 disabled:opacity-50 px-6 py-3"
								>
									{isLoading
										? t("createService.creating")
										: t("createService.create")}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateServicePage;
