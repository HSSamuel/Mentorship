import React, { useState, useEffect } from "react";
import apiClient from "../api/axios";

const MentorRequestsPage = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const response = await apiClient.get("/requests/received");
        setRequests(response.data);
      } catch (err) {
        setError("Failed to load mentorship requests.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceivedRequests();
  }, []);

  const handleUpdateRequest = async (
    requestId: string,
    status: "ACCEPTED" | "REJECTED"
  ) => {
    try {
      const response = await apiClient.put(`/requests/${requestId}`, {
        status,
      });
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === requestId ? { ...req, status: response.data.status } : req
        )
      );
    } catch (err) {
      alert(`Failed to ${status.toLowerCase()} request.`);
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading incoming requests...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Incoming Mentorship Requests</h2>
      {requests.length > 0 ? (
        requests.map((req) => (
          <div
            key={req.id}
            style={{
              border: "1px solid #eee",
              padding: "16px",
              margin: "16px 0",
            }}
          >
            <h4>Request from: {req.mentee.profile.name}</h4>
            <p>
              <strong>Bio:</strong> {req.mentee.profile.bio}
            </p>
            <p>
              <strong>Goals:</strong> {req.mentee.profile.goals}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>

            {req.status === "PENDING" && (
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => handleUpdateRequest(req.id, "ACCEPTED")}>
                  Accept
                </button>
                <button
                  onClick={() => handleUpdateRequest(req.id, "REJECTED")}
                  style={{ background: "#f44336", color: "white" }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>You have no incoming mentorship requests.</p>
      )}
    </div>
  );
};

export default MentorRequestsPage;
