import React, { useState, useEffect } from "react";
import apiClient from "../api/axios";

const MyRequestsPage = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await apiClient.get("/requests/sent");
        setRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch sent requests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (isLoading) return <p>Loading your requests...</p>;

  return (
    <div>
      <h2>My Sent Mentorship Requests</h2>
      {requests.length > 0 ? (
        requests.map((req) => (
          <div
            key={req.id}
            style={{
              border: "1px solid #eee",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <p>
              <strong>Mentor:</strong> {req.mentor.profile.name}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(req.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>You have not sent any mentorship requests yet.</p>
      )}
    </div>
  );
};

export default MyRequestsPage;
