import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

const OrganizerDashboard = () => {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>🎤 Organizer</h2>
      </div>

      <div className="content">
        <div className="topbar">
          <span>{user?.email}</span>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>

        <h3>My Events</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.title}</td>
                <td>{new Date(e.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
