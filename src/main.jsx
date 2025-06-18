import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import App from "./App.jsx";
import i18n from "./i18n/config";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";

// Esperar a que i18n esté listo antes de renderizar
i18n.init().then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </StrictMode>
  );
});
