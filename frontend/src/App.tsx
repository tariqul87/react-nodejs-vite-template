import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth/AuthContext";
import GuestOnlyRoute from "./auth/GuestOnlyRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import ForgotPasswordPage from "./pages/ForgotPassword";
import HomePage from "./pages/Home";
import LandingPage from "./pages/Landing";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

function App() {
  useEffect(() => {
    const title = import.meta.env.VITE_APP_TITLE ?? "React + Node.js Template";
    document.title = title;
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <GuestOnlyRoute>
                  <LandingPage />
                </GuestOnlyRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/forgot-password"
              element={
                <GuestOnlyRoute>
                  <ForgotPasswordPage />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
