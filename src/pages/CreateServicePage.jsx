import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header.jsx";
import { Background } from "../components/background.jsx";

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
    <>
      <main>
		<Header />
        <div className="min-h-screen bg-[#070714]  w-full flex flex-col items-center justify-start relative overflow-x-hidden">
          

          {/* Contenedor del formulario y decoraciones */}
          <div className="relative flex-1 w-full flex items-center justify-center py-8 sm:py-16">
            <Background />

            {/* Formulario principal perfectamente centrado */}
			<article >
            <article className="relative z-20 w-full flex items-center justify-center bg-[#1a1c2d]  rounded-xl">
              <section className="w-full max-w-2xl px-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mt-8 mb-8 text-center">
                  {t("createService.title")}
                </h1>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 bg-[#070714] dark:bg-darkCard p-8 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300 relative mb-4"
                >
                  <div>
                    <label className="block text-gray-400  mb-2">
                      {t("createService.serviceTitle")}
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder={t("createService.serviceTitlePlaceholder")}
                      required
                      className="w-full px-2 py-2 rounded-lg bg-[#1a1c2d] text-white placeholder:text-gray-400  "
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400  mb-2">
                      {t("createService.description")}
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-[#1a1c2d]   placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-lightBlue  min-h-[120px] "
                      placeholder={t("createService.descriptionPlaceholder")}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400  mb-2">
                        {t("createService.pricePerHour")}
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder={t("createService.pricePlaceholder")}
                        required
                        className=" w-full px-4 py-2 bg-[#1a1c2d] rounded-lg placeholder-gray-400 text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 dark:text-darkText mb-2">
                        {t("createService.category")}
                      </label>
                      <select
                        name="category_name"
                        value={formData.category_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-[#1a1c2d] text-gray-400 focus:outline-none focus:ring-2 focus:ring-lightBlue "
                        required
                        disabled={loadingCategories}
                      >
                        <option value="" disabled hidden>
                          {loadingCategories ? t("common.loading") : t("createService.selectCategory")}
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
                    <label className="block text-gray-400 dark:text-darkText mb-2">
                      {t("createService.location")}
                    </label>
                    <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleChange}
                      placeholder={t("createService.locationPlaceholder")}
                      required
                      className=" w-full px-2 py-2 rounded-lg bg-[#1a1c2d] text-gray-400 placeholder:text-gray-400 "
                    />
                  </div>

                  <div className="flex justify-between gap-4  mt-8 gap-20">
                   
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 dark:border-gray-700 rounded-lg"
                    >
                      {t("createService.cancel")}
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || loadingCategories}
                      className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400  hover:from-purple-700 hover:to-blue-700 text-white  disabled:opacity-50 px-6 py-3 rounded-lg"
                    >
                      {t("createService.create")}
                    </button>
                  </div>
                </form>
              </section>
            </article>
			</article>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateServicePage;
