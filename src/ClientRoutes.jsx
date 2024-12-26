// src/routes/ClientRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
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
import CartPage from "./pages/client/CartPage";
import CheckOutPage from "./pages/client/CheckOutPage";
import ProtectedRoute from "./ProtectedRoute";
import UnknownPage from "./pages/UnknowPage";
import { OrderHistoryPage } from "./pages/client/OrderHistoryPage";
import { OrderSuccessPage } from "./pages/client/OrderSuccessPage";
import OrderDetailPage from "./pages/client/OrderDetailPage";

const ClientRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/all-products" element={<AllProductsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/contact" element={<HomePage />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute roles={["ADMIN", "USER"]}>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route path="/product-detail/:id" element={<ProductDetailsPage />} />
      <Route path="/order-history" element={<OrderHistoryPage />} />
      <Route path="/order-detail/:orderCode" element={<OrderDetailPage />} />
      <Route
        path="/check-out"
        element={
          <ProtectedRoute roles={["ADMIN", "USER"]}>
            <CheckOutPage />
          </ProtectedRoute>
        }
      />
      <Route path="/order-success/:orderCode" element={<OrderSuccessPage/>} />
      <Route path="/unauthorized" element={<UnknownPage />} />
    </Routes>
  </>
);

export default ClientRoutes;
