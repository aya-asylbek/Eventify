import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h2>🎟️ Eventify</h2>

      <div className="nav-links">
        <Link to="/">Events</Link>

        {user ? (
          <>
            {user.role === "attendee" && (
              <Link to="/my-registrations">My Registrations</Link>
            )}
            {(user.role === "organizer" || user.role === "admin") && (
              <Link to="/create-event">Create Event</Link>
            )}
            {user.role === "admin" && <Link to="/users">Users</Link>}
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
