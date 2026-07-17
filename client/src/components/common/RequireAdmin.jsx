// RequireAdmin.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function RequireAdmin({ children }) {
  const auth = useAuth();
  const location = useLocation();

  // Wait for auth loading to complete
  if (auth.loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (!auth.user || auth.user.role !== "admin") {
    return <Navigate to="/login/admin" state={{ from: location }} replace />;
  }

  return children;
}
