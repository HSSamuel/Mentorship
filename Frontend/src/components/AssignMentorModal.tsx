import React, { useState } from "react";

interface AssignMentorModalProps {
  mentors: any[];
  onAssign: (mentorId: string) => void;
  onClose: () => void;
}

const AssignMentorModal = ({
  mentors,
  onAssign,
  onClose,
}: AssignMentorModalProps) => {
  const [selectedMentor, setSelectedMentor] = useState("");

  const handleAssign = () => {
    if (selectedMentor) {
      onAssign(selectedMentor);
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
  };

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContent}>
        <h3>Assign a Mentor</h3>
        <div style={styles.formGroup}>
          <label>Select Mentor:</label>
          <select
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">--Select a Mentor--</option>
            {mentors.map((mentor) => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.profile?.name || mentor.email}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.buttonGroup}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAssign}
            disabled={!selectedMentor}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignMentorModal;
