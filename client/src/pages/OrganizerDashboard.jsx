import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

const API = "http://localhost:5001/api";

const OrganizerDashboard = () => {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    capacity: "",
  });
  const [editId, setEditId] = useState(null);

  // === FETCH EVENTS & STATS ===
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchData = async () => {
      try {
        const [eventsRes, statsRes] = await Promise.all([
          axios.get(`${API}/events`, config),
          axios.get(`${API}/events/stats`, config),
        ]);
        setEvents(eventsRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err.response?.data || err.message);
      }
    };
    fetchData();
  }, []);

  // === HANDLE INPUT CHANGES ===
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // === CREATE EVENT ===
  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await axios.post(`${API}/events`, formData, config);
      alert("Event created!");
      setEvents([...events, res.data]);
      setFormData({ title: "", description: "", date: "", venue: "", capacity: "" });
      setTab("events");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating event");
    }
  };

  // === DELETE EVENT ===
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API}/events/${id}`, config);
      setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      alert("Error deleting event");
    }
  };

  // === EDIT EVENT ===
  const handleEdit = (event) => {
    setEditId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.split("T")[0],
      venue: event.venue,
      capacity: event.capacity,
    });
    setTab("edit");
  };

  // === UPDATE EVENT ===
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await axios.put(`${API}/events/${editId}`, formData, config);
      alert("Event updated!");
      setEvents(events.map((e) => (e.id === editId ? res.data : e)));
      setEditId(null);
      setFormData({ title: "", description: "", date: "", venue: "", capacity: "" });
      setTab("events");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating event");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>🎤 Organizer Dashboard</h2>
        <div className="header-right">
          <span>{user?.email}</span>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="dashboard-tabs">
        <button onClick={() => setTab("events")} className={tab === "events" ? "active" : ""}>
          My Events
        </button>
        <button onClick={() => setTab("create")} className={tab === "create" ? "active" : ""}>
          Create Event
        </button>
        <button onClick={() => setTab("stats")} className={tab === "stats" ? "active" : ""}>
          Event Stats
        </button>
      </div>

      {/* CONTENT */}
      <div className="dashboard-content">
        <h3 style={{ color: "#4a3fa6", marginBottom: "15px" }}>
          Welcome back, Organizer! 🌟
        </h3>

        {/* === EVENTS LIST === */}
        {tab === "events" && (
          <>
            <h3>My Events</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Capacity</th> {/* ✅ добавлено */}
                  <th>Actions</th>
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
                      <td>{e.capacity}</td>
                      <td>
                        <button onClick={() => handleEdit(e)}>✏️</button>
                        <button onClick={() => handleDelete(e.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No events found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {/* === CREATE EVENT === */}
        {tab === "create" && (
          <>
            <h3>Create New Event</h3>
            <form onSubmit={handleCreate} className="create-event-form">
              <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
              <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              <input type="text" name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} required />
              <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} />
              <button type="submit">Create Event</button>
            </form>
          </>
        )}

        {/* === EDIT EVENT === */}
        {tab === "edit" && (
          <>
            <h3>Edit Event</h3>
            <form onSubmit={handleUpdate} className="create-event-form">
              <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
              <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              <input type="text" name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} required />
              <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} />
              <button type="submit">Update Event</button>
            </form>
          </>
        )}

        {/* === EVENT STATS === */}
        {tab === "stats" && (
          <>
            <h3>Event Registrations</h3>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Registrations</th>
                </tr>
              </thead>
              <tbody>
                {stats.length > 0 ? (
                  stats.map((s, i) => (
                    <tr key={i}>
                      <td>{s.title}</td>
                      <td>{s.registrations}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      No stats found
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

export default OrganizerDashboard;
