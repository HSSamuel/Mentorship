import React, { useState } from "react";
import apiClient from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

interface FeedbackModalProps {
  session: any;
  onClose: () => void;
  onFeedbackSubmitted: (updatedSession: any) => void;
}

const FeedbackModal = ({
  session,
  onClose,
  onFeedbackSubmitted,
}: FeedbackModalProps) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (user?.role === "MENTEE" && rating === 0) {
      setError("Please select a rating from 1 to 5.");
      return;
    }

    try {
      const payload = {
        comment,
        ...(user?.role === "MENTEE" && { rating }),
      };

      const response = await apiClient.put(
        `/sessions/${session.id}/feedback`,
        payload
      );
      onFeedbackSubmitted(response.data);
      onClose();
    } catch (err) {
      setError("Failed to submit feedback.");
    }
  };

  const styles = {
    modalBackdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    } as React.CSSProperties,
    modalContent: {
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      width: "400px",
    } as React.CSSProperties,
    formGroup: { marginBottom: "15px" } as React.CSSProperties,
    buttonGroup: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
    } as React.CSSProperties,
    star: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "lightgray",
    } as React.CSSProperties,
    starSelected: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "gold",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContent}>
        <h3>
          Feedback for session on {new Date(session.date).toLocaleDateString()}
        </h3>
        <form onSubmit={handleSubmit}>
          {user?.role === "MENTEE" && (
            <div style={styles.formGroup}>
              <label>Rating:</label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    style={rating === star ? styles.starSelected : styles.star}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          )}
          <div style={styles.formGroup}>
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: "100%", minHeight: "100px" }}
              placeholder="Share your thoughts on the session..."
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div style={styles.buttonGroup}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Submit Feedback</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
