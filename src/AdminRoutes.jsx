// src/routes/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/admin/DashboardPage";
import ManagerProductPage from "./pages/admin/ManagerProductPage";
import AnalyticPage from "./pages/admin/AnalyticPage";
import SettingPage from "./pages/admin/SettingPage";
import ManagerOrderPage from "./pages/admin/ManagerOrderPage";
import ProtectedRoute from "./ProtectedRoute"; // Tạo ProtectedRoute nếu chưa có
import ManagerBrandPage from "./pages/admin/ManagerBrandPage";
import ManagerCategoryPage from "./pages/admin/ManagerCategoryPage";
import FormProductPage from "./pages/admin/FormProductPage";
import ManagerAccountPage from "./pages/admin/ManagerAccountPage";
import AccountFormPage from "./pages/admin/AccountFormPage";
import UserInfoDetailPage from "./pages/admin/UserInfoDetailPage"
import UserInfoDetailFormPage from "./pages/admin/UserInfoDetailFormPage"
import ManagerOrderDetailPage from "./pages/admin/ManagerOrderDetailPage";
import StatisticsPage from "./pages/admin/StatisticsPage";
import UpdateProductFormPage from "./pages/admin/UpdateProductFormPage";

const AdminRoutes = () => (
  <Routes>
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/products"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <ManagerProductPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/products/new"
      element={
        // <ProtectedRoute roles={["ADMIN"]}>
          <FormProductPage />
        // </ProtectedRoute>
      }
    />
    <Route
      path="/admin/products/update/:productId"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <UpdateProductFormPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/orders"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <ManagerOrderPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/orders/order-details/:orderCode"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <ManagerOrderDetailPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/accounts"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <ManagerAccountPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/accounts/view/:id"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <AccountFormPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/accounts/new"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <AccountFormPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/accounts/info-detail/credentialId/:id"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <UserInfoDetailPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/accounts/info-detail/new/credentialId/:credentialId"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <UserInfoDetailFormPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/accounts/info-detail/update/credentialId/:credentialId"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <UserInfoDetailFormPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/analytics"
      element={
        <AnalyticPage />
        // <ProtectedRoute roles={["ADMIN"]}>
        //   <AnalyticPage />
        // </ProtectedRoute>
      }
    />
    <Route
      path="/admin/statistics"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <StatisticsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/brands"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <ManagerBrandPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/categories"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <ManagerCategoryPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/settings"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <SettingPage />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AdminRoutes;
