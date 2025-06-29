import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header.jsx";
import { Background } from "../components/shared/Background/index.jsx";

import { useFreelancersList } from "../hooks/freelancers/useFreelancersList.js";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import { getCategories } from "../services/services/getFilteredServicesService.js";

const CreateServicePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleCreateService } = useFreelancersList();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const { token, userLogged, loading: authLoading, isAuthenticated } = useContext(AuthContext);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const [formData, setFormData] = useState({
    category_name: "",
    title: "",
    description: "",
    price: "",
    place: "",
    img: "",
  });

  // Verificar rol del usuario al cargar la página
  useEffect(() => {
    // Solo verificar cuando la autenticación haya terminado de cargar
    if (!authLoading) {
      if (!isAuthenticated) {
        // Si no está autenticado, redirigir al login
        navigate("/login");
        return;
      }
      
      if (userLogged && userLogged.role !== 'freelancer') {
        setShowRoleModal(true);
      }
    }
  }, [userLogged, authLoading, isAuthenticated, navigate]);

  const handleFileChange = (e) => {
			const file = e.target.files[0];
			setFormData((prev) => ({
				...prev,
				img: file,
  }));
		};

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
      // Verificar rol antes de enviar
      if (userLogged && userLogged.role !== 'freelancer') {
        setShowRoleModal(true);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("category_name", formData.category_name);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("place", formData.place);
      if (formData.img) {
        formDataToSend.append("img", formData.img);
      }

      await handleCreateService(formDataToSend);
      navigate("/services");
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      // Si el error es por rol, mostrar el modal
      if (error.message && error.message.includes("Solo los freelancers")) {
        setShowRoleModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseRoleModal = () => {
    setShowRoleModal(false);
    navigate(-1); // Volver a la página anterior
  };

  // Modal para usuarios que no son freelancers
  const RoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md mx-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-4">
            Acceso Restringido
          </h3>
          <p className="text-gray-300 mb-6">
            Solo los freelancers pueden crear servicios. Si eres un freelancer, 
            contacta a un administrador para solicitar el cambio de rol.
          </p>
          <button
            onClick={handleCloseRoleModal}
            className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  // Si el usuario no es freelancer, mostrar solo el modal
  if (showRoleModal) {
    return <RoleModal />;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-950 pt-24">
        <Background />
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <article className="max-w-4xl mx-auto">
              <article className="mb-8">
                <section className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-white mb-4">
                    {t("createService.title")}
                  </h1>
                  <p className="text-gray-400 text-lg">
                    Crea un nuevo servicio para mostrar tus habilidades
                  </p>
                </section>

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
                    <label className="block text-gray-400 mb-2">
                      Service Images
                    </label>
                    <input
                      type="file"
                      name="img"
                      onChange={handleFileChange}
                      accept="image/*,video/*"
                      className="w-full px-2 py-2 rounded-lg bg-[#1a1c2d] text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                    {formData.img && (
                      <p className="text-sm text-gray-500 mt-1">
                        Selected File: {formData.img.name}
                      </p>
                    )}
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
              </article>
            </article>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateServicePage;
