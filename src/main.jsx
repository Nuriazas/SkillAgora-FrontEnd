import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/main.css";
import App from "./App.jsx";
import { AuthContextProvider }from "./context/AuthContextProvider.jsx";


const container = document.getElementById("root"); 

if(!container){
  throw new Error('No se encontró el elemento con id "root" en el DOM')
    }


const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
