import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/axios";

const MyMentorsPage = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // This gets all sent requests, we filter for accepted ones
        const response = await apiClient.get("/requests/sent");
        const acceptedMatches = response.data.filter(
          (req: any) => req.status === "ACCEPTED"
        );
        setMatches(acceptedMatches);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (isLoading) return <p>Loading your mentors...</p>;

  return (
    <div>
      <h2>My Mentors</h2>
      {matches.length > 0 ? (
        matches.map((match) => (
          <div
            key={match.id}
            style={{
              border: "1px solid #eee",
              padding: "16px",
              margin: "16px 0",
            }}
          >
            <h4>{match.mentor.profile.name}</h4>
            <p>
              You were matched on{" "}
              {new Date(match.updatedAt).toLocaleDateString()}
            </p>
            <Link to={`/book-session/${match.mentor.id}`}>
              <button>Book a Session</button>
            </Link>
          </div>
        ))
      ) : (
        <p>You have no active mentorships. Find a mentor to get started!</p>
      )}
    </div>
  );
};

export default MyMentorsPage;
