import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";
import ForgotPasswordPage from "./pages/ForgotPassword";
import HomePage from "./pages/Home";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

function App() {
  useEffect(() => {
    const title = import.meta.env.VITE_APP_TITLE ?? "React + Node.js Template";
    document.title = title;
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
