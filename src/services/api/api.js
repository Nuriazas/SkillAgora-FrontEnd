// src/services/api/api.js

import { getAllServices } from "./getAllServicesService.js";
import { getServiceById } from "./getServiceDetailsService.js";
import {
  getProfileByName,
  getCurrentUserFromToken,
} from "./getProfileByNameService.js";
import { getFeaturedServices } from "./getFeaturedServicesService.js";
import {
  getFilteredServices,
  getCategories,
} from "./getFilteredServicesService.js";

// ✅ Actualizado: función para actualizar perfil
const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3000/users/update/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Error al actualizar");
  return result;
};

// ✅ NUEVO: función para subir avatar
const uploadProfilePhoto = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/users/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // No se pone Content-Type manualmente
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Error al subir imagen");
  return result;
};

export const servicesApi = {
  getAllServices,
  getServiceById,
  getFeaturedServices,
  getFilteredServices,
  getCategories,
};

export const userApi = {
  getProfileByName,
  getCurrentUserFromToken,
  updateProfile,
  uploadProfilePhoto, // 👈 Importante: este nombre es el que usas en EditProfilePage
};

export const contactApi = {
  sendContactRequest: async (data) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch("http://localhost:3000/contact/request", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};
