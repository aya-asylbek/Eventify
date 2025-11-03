import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Dashboard.css";

const API = "http://localhost:5001/api";

const AttendeeDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

// ===== Fetch all events =====
useEffect(() => {
  const fetchEvents = async () => {
    try {
      const token = user?.token;
      if (!token) {
        console.warn("⚠️ No token, skipping events fetch");
        return;
      }

      const res = await axios.get(`${API}/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🎟️ Events fetched:", res.data);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err.response?.data || err);
    }
  };

  fetchEvents();
}, [user]);


  // ===== Fetch attendee's registrations =====
  const fetchRegistrations = async () => {
    try {
      const token = user?.token;
      if (!token) {
        toast.error("❌ No token found. Please log in again.");
        return;
      }

      const res = await axios.get(`${API}/registrations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("📦 Registrations data:", res.data);
      setRegistrations(res.data);
    } catch (err) {
      console.error("Error fetching registrations:", err.response?.data || err);
      if (err.response?.status === 401) toast.error("⚠️ Unauthorized. Please log in again.");
    }
  };

  // ===== Load registrations when user logs in =====
  useEffect(() => {
    if (user?.token) fetchRegistrations();
  }, [user]);

  // ===== Refresh when switching tab =====
  useEffect(() => {
    if (activeTab === "registrations") fetchRegistrations();
  }, [activeTab]);

  // ===== Register for event =====
  const handleRegister = async (eventId) => {
    try {
      const token = user?.token;
      if (!token) {
        toast.error("❌ No token found. Please log in again.");
        return;
      }

      await axios.post(
        `${API}/registrations`,
        { event_id: eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Successfully registered!");
      setTimeout(() => fetchRegistrations(), 400);
    } catch (err) {
      console.error("Error registering:", err.response?.data || err);
      toast.error(err.response?.data?.error || "⚠️ Error registering.");
    }
  };

  // ===== Cancel registration =====
  const handleCancel = async (registrationId) => {
    if (!window.confirm("Are you sure you want to cancel this registration?")) return;

    try {
      await axios.delete(`${API}/registrations/user/${registrationId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.info("❌ Registration canceled.");
      fetchRegistrations();
    } catch (err) {
      console.error("Error canceling:", err.response?.data || err.message);
      toast.error("Something went wrong.");
    }
  };

  // ===== Check if already registered =====
  const isRegistered = (eventId) => {
    return registrations.some(
      (r) => r.event_id === eventId || r.eventid === eventId
    );
  };

  return (
    <div className="admin-dashboard">
      <ToastContainer position="top-right" autoClose={2500} />

      {/* ==== Header ==== */}
      <div className="dashboard-header">
        <h2>👋 Welcome back, {user?.name || "Attendee"}!</h2>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>

      {/* ==== Tabs ==== */}
      <div className="dashboard-tabs">
        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          All Events
        </button>
        <button
          className={activeTab === "registrations" ? "active" : ""}
          onClick={() => setActiveTab("registrations")}
        >
          My Registrations
        </button>
      </div>

      {/* ==== Events Section ==== */}
      {activeTab === "events" && (
        <section className="fade-section fade-in">
          <h3>🎉 Available Events</h3>
          {events.length === 0 ? (
            <p>No events available right now.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev.id}>
                    <td>{ev.title}</td>
                    <td>{new Date(ev.date).toLocaleDateString()}</td>
                    <td>{ev.venue}</td>
                    <td>
                      {isRegistered(ev.id) ? (
                        <button className="registered-btn" disabled>
                          ✅ Registered
                        </button>
                      ) : (
                        <button
                          className="register-btn"
                          onClick={() => handleRegister(ev.id)}
                        >
                          Register
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      {/* ==== Registrations Section ==== */}
      {activeTab === "registrations" && (
        <section className="fade-section fade-in">
          <h3>🗓️ My Event Registrations</h3>
          {registrations.length === 0 ? (
            <p>You haven't registered for any events yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Ticket Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((r) => (
                  <tr key={r.id}>
                    <td>{r.title}</td>
                    <td>{new Date(r.date).toLocaleDateString()}</td>
                    <td>{r.ticket_type}</td>
                    <td>
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(r.id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </div>
  );
};

export default AttendeeDashboard;
