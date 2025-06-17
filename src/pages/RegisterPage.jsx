import React from "react";
import { useState, useContext , useEffect} from "react";
import FormRegister from "../components/FormRegister.jsx";
import registerUserService from "../services/users/RegisterUserService.js";
import { AuthContext } from "../context/AuthContextProvider.jsx";

import { useNavigate } from "react-router-dom";
import { Background } from "../components/background.jsx";

import Spinner from "../components/Spinner.jsx";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);
  
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setMessage("");
      setError("");
    },5000);

    return() =>clearTimeout(timer);
  }, [message,error]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const data = await registerUserService(form);
      setToken(data.token);

      setMessage("Registro realizado correctamente");
      setForm({ name: "", lastName: "", password: "" });
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="relative min-h-screen overflow-hidden">
        <Background />
        {(error || message) && (
          <div className="absolute top-4 rigth-4 z-50 bg-transparent text-white px-4 py-2 rounded-lg shadow-lg max-w-xs text-sm ">
            {error && <p className="text-white text-sm text-center">{error}</p>}
            {message && (
              <p className="text-white text-sm text-center">{message}</p>
            )}
          </div>
        )}

        <section className=" relative z-10 h-screen flex items-start justify-center  px-4 pt-4">
          {/* Tarjeta centrada */}
          <article className="bg-[#2C2B36] p-3 rounded-3xl shadow-2xl w-[250px] h-[350px] mx-auto my-12 overflow-hidden flex flex-col justify-between text-xs">
            {/* Header */}
            <h1 className="text-white text-xl font-bold text-center tracking-wide mt-1 mx-4 mb-4">
              <span className="mr-2">⚒</span>SkillAgora
            </h1>
            <section className="text-center space-y-1 bg-[#35343c] rounded-3xl">
              <header>
                <h2 className=" m-2 text-white text-sm font-semibold">
                  Register
                </h2>
              </header>

              {/* Contenido del formulario */}
              <div className="mx-6 mt-4 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormRegister form={form} handleChange={handleChange} />
                </form>
              </div>
            </section>
          </article>
        </section>
      </main>
    </>
  );
};

export default RegisterPage;
