import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../api/axios";

// As per the PRD, skills are a list. We can hardcode them for now.
const availableSkills = [
  "Marketing",
  "UI/UX",
  "Backend Development",
  "Product Management",
  "Fundraising",
];

const ProfileEditPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: [] as string[],
    goals: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Pre-fill form if user data is available (for editing)
  useEffect(() => {
    // We assume the profile data is nested under the user object
    // This may need adjustment based on your exact API response for /users/me
    if (user?.profile) {
      setFormData({
        name: user.profile.name || "",
        bio: user.profile.bio || "",
        skills: user.profile.skills || [],
        goals: user.profile.goals || "",
      });
    }
  }, [user]);

  const handleSkillChange = (skill: string) => {
    setFormData((prev) => {
      const newSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: newSkills };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Using the endpoint specified in the PRD
      await apiClient.put("/users/me/profile", formData);
      setSuccess("Profile updated successfully!");
      // Optionally, redirect the user after a short delay
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div>
      <h2>Setup Your Profile</h2>
      <p>Please complete your profile to continue.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label>Short Bio:</label> [cite: 19]
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>
        <div>
          <label>Skills (select multiple):</label> [cite: 20]
          <div>
            {availableSkills.map((skill) => (
              <div key={skill}>
                <input
                  type="checkbox"
                  id={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                />
                <label htmlFor={skill}>{skill}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Your Goals:</label> [cite: 21]
          <input
            type="text"
            placeholder="e.g., Improve product design skills"
            value={formData.goals}
            onChange={(e) =>
              setFormData({ ...formData, goals: e.target.value })
            }
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
