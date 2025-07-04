import React, { useState, useEffect } from "react";
import apiClient from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import FeedbackModal from "../components/FeedbackModal";

const SessionsListPage = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;

      const endpoint =
        user.role === "MENTOR" ? "/sessions/mentor" : "/sessions/mentee";

      try {
        const response = await apiClient.get(endpoint);
        setSessions(response.data);
      } catch (err) {
        setError("Failed to load sessions.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [user]);

  const handleOpenFeedbackModal = (session: any) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleFeedbackSubmitted = (updatedSession: any) => {
    // Update the specific session in the list to reflect the new feedback
    setSessions((prev) =>
      prev.map((s) => (s.id === updatedSession.id ? updatedSession : s))
    );
  };

  const renderSessionCard = (session: any) => {
    const otherUser = user?.role === "MENTOR" ? session.mentee : session.mentor;
    const sessionDate = new Date(session.date);
    const isPastSession = sessionDate < new Date();
    // Check if feedback has already been left for this session
    const hasFeedback = session.rating || session.feedback;

    return (
      <div
        key={session.id}
        style={{
          border: `1px solid ${isPastSession ? "#ddd" : "#ccc"}`,
          padding: "16px",
          margin: "16px 0",
          background: isPastSession ? "#f9f9f9" : "white",
        }}
      >
                <h4>Session with: {otherUser.profile.name}</h4>       {" "}
        <p>
                    <strong>Date:</strong> {sessionDate.toLocaleString()}       {" "}
        </p>
               {" "}
        <p>
                    <strong>Status:</strong>{" "}
          {isPastSession ? "Completed" : "Upcoming"}       {" "}
        </p>
               {" "}
        {isPastSession && !hasFeedback && (
          <button onClick={() => handleOpenFeedbackModal(session)}>
                        Add Feedback          {" "}
          </button>
        )}
               {" "}
        {isPastSession && hasFeedback && (
          <p>
                        <em>Feedback submitted.</em>         {" "}
          </p>
        )}
             {" "}
      </div>
    );
  };

  if (isLoading) return <p>Loading your sessions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
            <h2>My Sessions</h2>     {" "}
      {sessions.length > 0 ? (
        sessions.map(renderSessionCard)
      ) : (
        <p>You have no scheduled sessions.</p>
      )}
           {" "}
      {isModalOpen && selectedSession && (
        <FeedbackModal
          session={selectedSession}
          onClose={() => setIsModalOpen(false)}
          onFeedbackSubmitted={handleFeedbackSubmitted}
        />
      )}
         {" "}
    </div>
  );
};

export default SessionsListPage;
