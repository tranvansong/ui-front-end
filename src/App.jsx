import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/client/AuthContext";
import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";
import LiveChat from "./components/client/LiveChat";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ClientRoutes />
        <AdminRoutes />
      </AuthProvider>
      <LiveChat/>
    </Router>
  );
}

export default App;
