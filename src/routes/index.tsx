import { Routes, Route, Navigate } from "react-router-dom";
import AuthView from "../views/auth";
import Dashboard from "../views/dashboard";
import Users from "../views/users";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthView />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
