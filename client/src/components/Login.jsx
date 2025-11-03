import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      const { user, token } = res.data;
      login(user, token);

      // role navigate
      if (user.role === "organizer") navigate("/organizer/dashboard");
      else if (user.role === "attendee") navigate("/attendee/dashboard");
      else if (user.role === "vendor") navigate("/vendor/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">🎟️ Eventify</h1>
        <p className="subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="footer-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
