import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AttendeeDashboard from "./pages/AttendeeDashboard";

import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      {/* 🔹 Navbar временно отключён */}

      <Routes>
        {/* 🔹 Главная */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : user.role === "organizer" ? (
                <Navigate to="/organizer/dashboard" />
              ) : (
                <Navigate to="/attendee/dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🔹 Login & Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔹 Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🔹 Organizer Dashboard */}
        <Route
          path="/organizer/dashboard"
          element={
            user && user.role === "organizer" ? (
              <OrganizerDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🔹 Attendee Dashboard */}
        <Route
          path="/attendee/dashboard"
          element={
            user && user.role === "attendee" ? (
              <AttendeeDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
