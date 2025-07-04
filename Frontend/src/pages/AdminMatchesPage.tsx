import React, { useState, useEffect } from "react";
import apiClient from "../api/axios";

const AdminMatchesPage = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await apiClient.get("/admin/matches");
        setMatches(response.data);
      } catch (err) {
        setError("Failed to fetch matches.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (isLoading) return <p>Loading all matches...</p>;
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
      <h2>All Mentorship Matches</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={styles.th}>Mentor</th>
            <th style={styles.th}>Mentee</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Date Requested</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td style={styles.td}>{match.mentor.profile?.name}</td>
              <td style={styles.td}>{match.mentee.profile?.name}</td>
              <td style={styles.td}>{match.status}</td>
              <td style={styles.td}>
                {new Date(match.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMatchesPage;
