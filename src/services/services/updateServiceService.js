import React from "react";
import { AuthContext } from "../../context/AuthContextProvider.jsx";

const updateServiceService = async (dataToSend, service, token) => {
  const response = await fetch(
    `http://localhost:3000/service/update/${service}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    }
  );

  return response;
};

export default updateServiceService;
