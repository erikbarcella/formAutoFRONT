import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";// Importe o useAuth

export function PrivateRoute({ children }) {
  const { user } = useAuth(); // Use o useAuth para verificar o estado de autenticação

  return user ? children : <Navigate to="/login" />;
}
