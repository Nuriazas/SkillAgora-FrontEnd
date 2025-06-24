import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import { AuthContext } from "../context/AuthContextProvider";
import { userApi } from "../services/api/api";
import DefaultAvatar from "../assets/defaultAvatar.jpeg";
import { useTranslation } from "react-i18next";

const EditProfilePage = () => {
  const { userLogged, setUserLogged } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    bio: "",
    language: "",
    portfolio_url: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userLogged) {
      setFormData({
        name: userLogged.name || "",
        lastName: userLogged.lastName || "",
        bio: userLogged.bio || "",
        language: userLogged.language || "",
        portfolio_url: userLogged.portfolio_url || "",
        avatar: userLogged.avatar || "",
      });
    }
  }, [userLogged]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let avatarUrl = formData.avatar;

      if (avatarFile) {
        const form = new FormData();
        form.append("img", avatarFile); // tu backend espera "img"
        const res = await userApi.uploadProfilePhoto(form);
        if (res.avatarUrl) {
          avatarUrl = res.avatarUrl;
        }
      }

      const updatedData = {
        ...formData,
        avatar: avatarUrl,
        id: userLogged.id, // necesario para backend
      };

      const response = await userApi.updateProfile(updatedData);

      if (response.success || response.status === "ok") {
        setUserLogged({ ...userLogged, ...updatedData });
        navigate(`/users/profile/${updatedData.name}`);
      } else {
        alert(t('editProfile.errorSaving'));
      }
    } catch (err) {
      console.error("Error updating profile", err);
      alert(t('editProfile.serverError'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />

      <div className="max-w-2xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6">{t('editProfile.title')}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <img
              src={formData.avatar || DefaultAvatar}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-lg"
            />
            <label className="text-purple-400 hover:underline cursor-pointer">
              {t('editProfile.changeAvatar')}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-300">{t('editProfile.firstName')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">{t('editProfile.lastName')}</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">{t('editProfile.bio')}</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded resize-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">{t('editProfile.language')}</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">{t('editProfile.portfolioUrl')}</label>
            <input
              type="url"
              name="portfolio_url"
              value={formData.portfolio_url}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={saving}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
            >
              {saving ? t('editProfile.saving') : t('editProfile.saveChanges')}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/users/profile/${userLogged?.name}`)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded"
            >
              {t('editProfile.cancel')}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default EditProfilePage;