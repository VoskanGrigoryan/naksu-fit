import { Routes, Route, Navigate } from "react-router-dom";
import AuthView from "../views/auth/Auth";
import Dashboard from "../views/dashboard/Dashboard";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthView />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
