import React, { useState, useEffect } from "react";
import apiClient from "../api/axios";

const AdminSessionsPage = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await apiClient.get("/admin/sessions");
        setSessions(response.data.sessions);
        setTotalCount(response.data.totalCount);
      } catch (err) {
        setError("Failed to fetch sessions.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (isLoading) return <p>Loading all sessions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const styles = {
    th: {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "left",
      background: "#f2f2f2",
    } as React.CSSProperties,
    td: { border: "1px solid #ddd", padding: "8px" } as React.CSSProperties,
  };

  return (
    <div>
      <h2>All Sessions</h2>
      <h3>Total Sessions Held: {totalCount}</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={styles.th}>Mentor</th>
            <th style={styles.th}>Mentee</th>
            <th style={styles.th}>Session Date</th>
            <th style={styles.th}>Feedback Rating</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td style={styles.td}>{session.mentor.profile?.name}</td>
              <td style={styles.td}>{session.mentee.profile?.name}</td>
              <td style={styles.td}>
                {new Date(session.date).toLocaleString()}
              </td>
              <td style={styles.td}>{session.rating || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSessionsPage;
