import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Dashboard.css";

const API = "http://localhost:5001/api";

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const res = await axios.get(`${API}/analytics`, config);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>📊 Event Analytics Dashboard</h2>
      </div>

      {data.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No analytics data available yet.
        </p>
      ) : (
        <>
          <div style={{ width: "100%", height: 400, marginTop: "30px" }}>
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="event" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="registrations" fill="#7c3aed" name="Registrations" />
                <Bar dataKey="revenue" fill="#16a34a" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ==== Table ==== */}
          <table style={{ marginTop: "40px" }}>
            <thead>
              <tr>
                <th>Event</th>
                <th>Registrations</th>
                <th>Ticket Price</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.event}</td>
                  <td>{row.registrations}</td>
                  <td>${Number(row.price).toFixed(2)}</td>
                  <td>${Number(row.revenue).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
