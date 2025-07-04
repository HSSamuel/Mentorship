import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../api/axios";

const availableSkills = [
  "Marketing",
  "UI/UX",
  "Backend Development",
  "Product Management",
  "Fundraising",
];

const ProfileEditPage = () => {
  const { user, refetchUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: [] as string[],
    goals: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isCalendarConnected = !!user?.googleAccessToken;

  useEffect(() => {
    if (user?.profile) {
      setFormData({
        name: user.profile.name || "",
        bio: user.profile.bio || "",
        skills: user.profile.skills || [],
        goals: user.profile.goals || "",
      });
    }

    // Check for the redirect query parameter from the calendar auth
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("calendar") === "success") {
      setSuccess("Google Calendar connected successfully!");
      refetchUser(); // Refetch user data to get the new tokens
      // Clean the URL
      navigate("/profile/edit", { replace: true });
    }
  }, [user, location.search, navigate, refetchUser]);

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
      await apiClient.put("/users/me/profile", formData);
      setSuccess("Profile updated successfully!");
      refetchUser();
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  const handleConnectCalendar = () => {
    // Redirect the user to our backend endpoint, which will then redirect to Google
    window.location.href = `${apiClient.defaults.baseURL}/api/calendar/google`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Edit Your Profile
      </h1>

      {/* Profile Form Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Short Bio
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {availableSkills.map((skill) => (
                <div key={skill} className="flex items-center">
                  <input
                    id={skill}
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={skill} className="ml-3 text-sm text-gray-700">
                    {skill}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="goals"
              className="block text-sm font-medium text-gray-700"
            >
              Your Goals
            </label>
            <input
              type="text"
              id="goals"
              placeholder="e.g., Improve product design skills"
              value={formData.goals}
              onChange={(e) =>
                setFormData({ ...formData, goals: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="pt-4">
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center mb-4">
                {success}
              </p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 border-none rounded-lg bg-blue-600 text-white text-lg font-semibold cursor-pointer transition-colors hover:bg-blue-700"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Calendar Integration Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Integrations</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-700">Google Calendar</p>
            <p
              className={`text-sm ${
                isCalendarConnected ? "text-green-600" : "text-gray-500"
              }`}
            >
              {isCalendarConnected ? "Connected" : "Not Connected"}
            </p>
          </div>
          {!isCalendarConnected && (
            <button
              onClick={handleConnectCalendar}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zM4 7a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm3 0a1 1 0 00-1 1v1a1 1 0 102 0V8a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v1a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Connect Calendar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
