import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../api/axios";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        let response;
        if (user.role === "ADMIN") {
          response = await apiClient.get("/admin/stats");
        } else if (user.role === "MENTOR") {
          response = await apiClient.get("/users/mentor/stats");
        } else {
          response = await apiClient.get("/users/mentee/stats");
        }
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (isLoading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>Could not load dashboard data.</p>;

  const renderAdminDashboard = () => (
    <div>
      <h3>Admin Dashboard</h3>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Matches: {stats.totalMatches}</p>
      <p>Total Sessions: {stats.totalSessions}</p>
    </div>
  );

  const renderMentorDashboard = () => (
    <div>
      <h3>Mentor Dashboard</h3>
      <p>Your Mentees: {stats.menteeCount}</p>
      <p>Pending Requests: {stats.pendingRequests}</p>
      <p>Upcoming Sessions: {stats.upcomingSessions}</p>
    </div>
  );

  const renderMenteeDashboard = () => (
    <div>
      <h3>Mentee Dashboard</h3>
      <p>Your Mentors: {stats.mentorCount}</p>
      <p>Pending Requests: {stats.pendingRequests}</p>
      <p>Upcoming Sessions: {stats.upcomingSessions}</p>
    </div>
  );

  return (
    <div>
      <h2>Dashboard</h2>
      {user?.role === "ADMIN" && renderAdminDashboard()}
      {user?.role === "MENTOR" && renderMentorDashboard()}
      {user?.role === "MENTEE" && renderMenteeDashboard()}
    </div>
  );
};

export default DashboardPage;
