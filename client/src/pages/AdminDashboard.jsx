import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AnalyticsDashboard from "./AnalyticsDashboard";
import "../styles/Dashboard.css";

const API = "http://localhost:5001/api";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  // --- edit states ---
  const [editingEvent, setEditingEvent] = useState(null);
  const [editEventData, setEditEventData] = useState({
    title: "",
    date: "",
    venue: "",
  });

  const [editingReg, setEditingReg] = useState(null);
  const [editRegData, setEditRegData] = useState({ ticket_type: "" });

  // --- Fetch all data ---
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

  // --- Delete user ---
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

  // --- Delete event ---
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

  // --- Edit event ---
  const editEvent = (event) => {
    setEditingEvent(event.id);
    setEditEventData({
      title: event.title,
      date: new Date(event.date).toISOString().split("T")[0],
      venue: event.venue,
    });
  };

  const saveEventEdit = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const res = await axios.put(`${API}/events/${editingEvent}`, editEventData, config);
      setEvents(events.map((e) => (e.id === editingEvent ? res.data : e)));
      setEditingEvent(null);
    } catch (err) {
      console.error("Error editing event:", err);
    }
  };

  // --- Edit registration ---
  const editRegistration = (reg) => {
    setEditingReg(reg.id);
    setEditRegData({ ticket_type: reg.ticket_type });
  };

  const saveRegEdit = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const res = await axios.put(`${API}/registrations/${editingReg}`, editRegData, config);
      setRegistrations(
        registrations.map((r) => (r.id === editingReg ? res.data.registration : r))
      );
      setEditingReg(null);
    } catch (err) {
      console.error("Error editing registration:", err);
    }
  };

  const deleteRegistration = async (id) => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (window.confirm("Delete this registration?")) {
      try {
        await axios.delete(`${API}/registrations/${id}`, config);
        setRegistrations(registrations.filter((r) => r.id !== id));
      } catch (err) {
        console.error("Error deleting registration:", err);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      {/* ==== Header ==== */}
      <div className="dashboard-header">
        <h2>🎟️ Eventify Admin Panel</h2>
        <div className="header-right">
          <span>Welcome back, Admin!</span>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* ==== Tabs ==== */}
      <div className="dashboard-tabs">
        <button onClick={() => setTab("users")} className={tab === "users" ? "active" : ""}>
          Users
        </button>
        <button onClick={() => setTab("events")} className={tab === "events" ? "active" : ""}>
          Events
        </button>
        <button
          onClick={() => setTab("registrations")}
          className={tab === "registrations" ? "active" : ""}
        >
          Registrations
        </button>
        <button
          onClick={() => setTab("analytics")}
          className={tab === "analytics" ? "active" : ""}
        >
          Analytics
        </button>
      </div>

      {/* ==== Content ==== */}
      <div className="dashboard-content">
        {tab === "analytics" && <AnalyticsDashboard />}

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
                      {editingEvent === e.id ? (
                        <>
                          <td>
                            <input
                              value={editEventData.title}
                              onChange={(ev) =>
                                setEditEventData({ ...editEventData, title: ev.target.value })
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              value={editEventData.date}
                              onChange={(ev) =>
                                setEditEventData({ ...editEventData, date: ev.target.value })
                              }
                            />
                          </td>
                          <td>
                            <input
                              value={editEventData.venue}
                              onChange={(ev) =>
                                setEditEventData({ ...editEventData, venue: ev.target.value })
                              }
                            />
                          </td>
                          <td>
                            <button onClick={saveEventEdit}>💾</button>
                            <button onClick={() => setEditingEvent(null)}>❌</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{e.title}</td>
                          <td>{new Date(e.date).toLocaleDateString()}</td>
                          <td>{e.venue}</td>
                          <td>
                            <button onClick={() => editEvent(e)}>✏️</button>
                            <button onClick={() => deleteEvent(e.id)}>🗑️</button>
                          </td>
                        </>
                      )}
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {registrations.length > 0 ? (
                  registrations.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.user}</td>
                      <td>{r.event}</td>
                      {editingReg === r.id ? (
                        <>
                          <td>
                            <select
                              value={editRegData.ticket_type}
                              onChange={(e) =>
                                setEditRegData({ ...editRegData, ticket_type: e.target.value })
                              }
                            >
                              <option value="">Select type</option>
                              <option value="Regular">Regular</option>
                              <option value="VIP">VIP</option>
                              <option value="Student">Student</option>
                              <option value="Premium">Premium</option>
                            </select>
                          </td>
                          <td>{new Date(r.created_at).toLocaleDateString()}</td>
                          <td>
                            <button onClick={saveRegEdit}>💾</button>
                            <button onClick={() => setEditingReg(null)}>❌</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{r.ticket_type}</td>
                          <td>{new Date(r.created_at).toLocaleDateString()}</td>
                          <td>
                            <button onClick={() => editRegistration(r)}>✏️</button>
                            <button onClick={() => deleteRegistration(r.id)}>🗑️</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
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
