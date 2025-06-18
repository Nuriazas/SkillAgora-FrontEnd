import { Routes, Route } from "react-router-dom";
import Freelancer from "./pages/Home/FreelancerPage";
import CreateServicePage from "./pages/CreateService/CreateServicePage";

function App() {
  return (
    <div className="min-h-screen bg-lightBackground dark:bg-darkBackground">
      <Routes>
        <Route path="/freelancers" element={<Freelancer />} />
        <Route path="/services/create" element={<CreateServicePage />} />
      </Routes>
    </div>
  );
}

export default App;
