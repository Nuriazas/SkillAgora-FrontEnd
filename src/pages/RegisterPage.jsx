import React from "react";
import { useState, useContext , useEffect} from "react";
import FormRegister from "../components/FormRegister.jsx";
import registerUserService from "../services/users/RegisterUserService.js";
import { AuthContext } from "../context/AuthContextProvider.jsx";

import { useNavigate } from "react-router-dom";
import { Background } from "../components/background.jsx";

import Spinner from "../components/Spinner.jsx";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const { t } = useTranslation();
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

      setMessage(t('register.success'));
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

        <section className=" relative z-10 h-screen flex items-center justify-center  px-4 pt-4">
          {/* Tarjeta centrada */}
          <article className="bg-[#1a1c2d] p-3 rounded-3xl shadow-2xl w-[500px] h-[700px] mx-auto my-12 overflow-hidden flex flex-col justify-between text-xs">
            {/* Header */}
            <div className=" flex justify-center  min-h-[60px] w-full  ">
							<button
								onClick={() => navigate("/")}
								className="text-[60px] font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 w-[400px] h-[100px] "
							>
								SkillAgora
							</button>
						</div>
            <section className="text-center space-y-5 bg-[#070714] rounded-3xl">
              <header>
                <h2 className=" mt-8 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent h-[40px] text-[25px] font-bold ">
                  {t('register.title')}
                </h2>
              </header>

              {/* Contenido del formulario */}
              <div className="mx-6 mt-4 space-y-4 min-h-[425px]">
                <form onSubmit={handleSubmit} className="space-y-">
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
