import { Routes, Route, Navigate } from "react-router-dom";
import AuthView from "../views/auth";
import Dashboard from "../views/dashboard";
import Users from "../views/users";
import UserDetail from "../views/userDetail";
import CalendarView from "../views/calendar";
import RoutinesView from "../views/routines";
import DietView from "../views/diets";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthView />} />

      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/user/:id" element={<UserDetail />} />

      <Route path="/classes" element={<CalendarView />} />
      <Route path="/routines" element={<RoutinesView />} />
      <Route path="/diets" element={<DietView />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
