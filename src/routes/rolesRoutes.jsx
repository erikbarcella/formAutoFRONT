import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Authorization({ allowedRoles, children }) {
  const { user } = useAuth();
  // Verifique se o usuário está autenticado e se tem um papel permitido
  const isAuthorized = user && user.roles && allowedRoles.some(role => user.roles.includes(role));
  return isAuthorized ? children : <Navigate to="/home" replace />;
}
