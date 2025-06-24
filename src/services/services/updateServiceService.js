import React from "react";
import { AuthContext } from "../../context/AuthContextProvider.jsx";

const updateServiceService = async (dataToSend, service, token) => {
;
	const response = await fetch(
		`http://localhost:3000/service/update/${service}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(dataToSend),
		}
	);

	return response;
};

export default updateServiceService;