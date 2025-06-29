const registerUserService = async (form) => {
    const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Respuesta del registro:", data); // Para debug

    if (!res.ok) throw new Error(data.message || "Error en el registro");
    return data;
};

export default registerUserService;
