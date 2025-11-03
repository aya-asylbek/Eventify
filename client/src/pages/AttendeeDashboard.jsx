import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

const AttendeeDashboard = () => {
  const { user, logout } = useAuth();
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/registrations").then((res) => setRegistrations(res.data));
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>🎓 Attendee</h2>
      </div>

      <div className="content">
        <div className="topbar">
          <span>{user?.email}</span>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>

        <h3>My Registrations</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Event</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.event_title}</td>
                <td>{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendeeDashboard;
