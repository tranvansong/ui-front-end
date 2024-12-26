import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import AboutPage from "./pages/client/AboutPage";
import ScrollToTop from "./components/client/ScrollToTop";
import FeedbackPage from "./pages/client/FeedbackPage";
import ProductDetailsPage from "./pages/client/ProductDetailsPage";
import AllProductsPage from "./pages/client/AllProductsPage";
import LoginPage from "./pages/client/LoginPage";
import RegisterPage from "./pages/client/RegisterPage";
import ForgotPasswordPage from "./pages/client/ForgotPassword";
import ResetPasswordPage from "./pages/client/ResetPasswordPage";
import { AuthProvider, useAuth } from "./context/client/AuthContext";
import DashboardPage from "./pages/admin/DashboardPage";
import ManagerProductPage from "./pages/admin/ManagerProductPage";
import ManagerCustomerPage from "./pages/admin/ManagerCustomerPage";
import AnalyticPage from "./pages/admin/AnalyticPage";
import SettingPage from "./pages/admin/SettingPage";
import ManagerOrderPage from "./pages/admin/ManagerOrderPage";
import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ClientRoutes />
        <AdminRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
