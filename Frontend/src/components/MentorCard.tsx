import React, { useState } from "react";
import apiClient from "../api/axios";

interface MentorCardProps {
  mentor: {
    id: string;
    profile: {
      name: string;
      bio: string;
      skills: string[];
      goals: string;
    };
  };
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  const [isRequested, setIsRequested] = useState(false);
  const [error, setError] = useState("");

  const handleRequestMentorship = async () => {
    setError("");
    try {
      await apiClient.post("/requests", { mentorId: mentor.id });
      setIsRequested(true);
    } catch (err) {
      setError("Failed to send request. You may have already sent one.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px 0",
      }}
    >
      <h3>{mentor.profile.name}</h3>
      <p>
        <strong>Bio:</strong> {mentor.profile.bio}
      </p>
      <div>
        <strong>Skills:</strong>
        <ul
          style={{ listStyle: "none", padding: 0, display: "flex", gap: "8px" }}
        >
          {mentor.profile.skills.map((skill) => (
            <li
              key={skill}
              style={{
                background: "#eee",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <p>
        <strong>Expertise:</strong> {mentor.profile.goals}
      </p>
      <button onClick={handleRequestMentorship} disabled={isRequested}>
        {isRequested ? "Request Sent" : "Request Mentorship"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default MentorCard;
