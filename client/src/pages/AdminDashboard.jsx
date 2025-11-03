import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

const API = "http://localhost:5001/api";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchData = async () => {
      try {
        const [usersRes, eventsRes, regRes] = await Promise.all([
          axios.get(`${API}/users`, config),
          axios.get(`${API}/events`, config),
          axios.get(`${API}/registrations/all`, config),
        ]);
        setUsers(usersRes.data);
        setEvents(eventsRes.data);
        setRegistrations(regRes.data);
      } catch (err) {
        console.error("Error loading data:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (window.confirm("Delete this user?")) {
      try {
        await axios.delete(`${API}/users/${id}`, config);
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const deleteEvent = async (id) => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (window.confirm("Delete this event?")) {
      try {
        await axios.delete(`${API}/events/${id}`, config);
        setEvents(events.filter((e) => e.id !== id));
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      {/* ==== Header ==== */}
      <div className="dashboard-header">
        <h2>🎟️ Eventify </h2>
        <div className="header-right">
          <span>{user?.email}</span>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* ==== Tabs ==== */}
      <div className="dashboard-tabs">
        <button
          onClick={() => setTab("users")}
          className={tab === "users" ? "active" : ""}
        >
          Users
        </button>
        <button
          onClick={() => setTab("events")}
          className={tab === "events" ? "active" : ""}
        >
          Events
        </button>
        <button
          onClick={() => setTab("registrations")}
          className={tab === "registrations" ? "active" : ""}
        >
          Registrations
        </button>
      </div>

      {/* ==== Content ==== */}
      <div className="dashboard-content">
        {/* USERS */}
        {tab === "users" && (
          <>
            <h3>All Users</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        <button onClick={() => deleteUser(u.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {/* EVENTS */}
        {tab === "events" && (
          <>
            <h3>All Events</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {events.length > 0 ? (
                  events.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.title}</td>
                      <td>{new Date(e.date).toLocaleDateString()}</td>
                      <td>{e.venue}</td>
                      <td>
                        <button onClick={() => deleteEvent(e.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No events found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {/* REGISTRATIONS */}
        {tab === "registrations" && (
          <>
            <h3>All Registrations</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Event</th>
                  <th>Ticket</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length > 0 ? (
                  registrations.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.user}</td>
                      <td>{r.event}</td>
                      <td>{r.ticket_type}</td>
                      <td>{new Date(r.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No registrations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
