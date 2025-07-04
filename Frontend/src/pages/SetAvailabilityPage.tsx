import React, { useState, useEffect } from "react";
import apiClient from "../api/axios";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface AvailabilityBlock {
  day: string;
  startTime: string;
  endTime: string;
}

const SetAvailabilityPage = () => {
  const [availability, setAvailability] = useState<AvailabilityBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await apiClient.get("/sessions/availability/me"); // Assuming this endpoint exists
        setAvailability(response.data);
      } catch (err) {
        // It's okay if this fails, might mean no availability is set yet
        console.log("No existing availability found.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAvailability();
  }, []);

  const handleAddTimeSlot = () => {
    setAvailability([
      ...availability,
      { day: "Monday", startTime: "10:00", endTime: "11:00" },
    ]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: keyof AvailabilityBlock,
    value: string
  ) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index] = {
      ...updatedAvailability[index],
      [field]: value,
    };
    setAvailability(updatedAvailability);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await apiClient.post("/sessions/availability", { availability });
      setSuccess("Your availability has been updated successfully!");
    } catch (err) {
      setError("Failed to save availability.");
    }
  };

  if (isLoading) return <p>Loading your schedule...</p>;

  return (
    <div>
      <h2>Set Your Weekly Availability</h2>
      <form onSubmit={handleSubmit}>
        {availability.map((slot, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <select
              value={slot.day}
              onChange={(e) => handleInputChange(index, "day", e.target.value)}
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <input
              type="time"
              value={slot.startTime}
              onChange={(e) =>
                handleInputChange(index, "startTime", e.target.value)
              }
            />
            <span>to</span>
            <input
              type="time"
              value={slot.endTime}
              onChange={(e) =>
                handleInputChange(index, "endTime", e.target.value)
              }
            />
            <button type="button" onClick={() => handleRemoveTimeSlot(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTimeSlot}>
          + Add Time Slot
        </button>
        <hr style={{ margin: "20px 0" }} />
        <button type="submit">Save Availability</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default SetAvailabilityPage;
