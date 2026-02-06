import { Routes, Route, Navigate } from "react-router-dom";
import AuthView from "../views/auth/Auth";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthView />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
