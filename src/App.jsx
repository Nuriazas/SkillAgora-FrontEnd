import React from "react";
import { Routes, Route } from "react-router-dom";

import Validacion from "./pages/Validacion";
import Freelancer from "./pages/FreelancerPage";
import CreateServicePage from "./pages/CreateServicePage";
import Login from "./pages/Login";
import NotFoundPage from "./components/NotFoundPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ServicesPage from "./pages/ServicesPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ErrorBoundary from "./components/shared/modals/ErrorBoundary.jsx"
import RegisterPage from "./pages/RegisterPage.jsx";
import Spinner from "./components/shared/UI/Spinner.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import HelpCenterPage from "./pages/HelpCenterPage.jsx";
import OrdersPage from "./pages/NotificationPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import ValidateUser from "./pages/ValidateUser.jsx";


function SpinnerPage() {
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}

function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/register" element={<RegisterPage />} />
          <Route path="/validacion" element={<Validacion />} />
          <Route path="/freelancers" element={<Freelancer />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/create" element={<CreateServicePage />} />
          <Route path="/users/profile/:name" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/notifications/contacts" element={<OrdersPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/review/:service_id" element={<ReviewPage />} />
          <Route path="/validate-user/:code" element={<ValidateUser />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;

