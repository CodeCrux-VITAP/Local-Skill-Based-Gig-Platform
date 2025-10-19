import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/mainPage";
import Signup from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import ClientDashboard from "./components/dashboard/Client";
import ProviderDashboard from "./components/dashboard/Provider";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
