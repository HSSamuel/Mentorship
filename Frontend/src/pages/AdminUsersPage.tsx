import React, { useState, useEffect } from "react";
import apiClient from "../api/axios";
import AssignMentorModal from "../components/AssignMentorModal";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get("/admin/users");
        setUsers(response.data);
        setMentors(response.data.filter((user: any) => user.role === "MENTOR"));
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await apiClient.put(`/admin/users/${userId}/role`, {
        role: newRole,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: response.data.role } : user
        )
      );
    } catch (err) {
      alert("Failed to update role.");
      console.error(err);
    }
  };

  const handleOpenModal = (mentee: any) => {
    setSelectedMentee(mentee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMentee(null);
  };

  const handleAssignMentor = async (mentorId: string) => {
    if (!selectedMentee) return;

    try {
      await apiClient.post("/admin/assign", {
        menteeId: selectedMentee.id,
        mentorId,
      });
      alert("Mentor assigned successfully!");
      handleCloseModal();
    } catch (err) {
      alert("Failed to assign mentor.");
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Manage Users</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={styles.td}>{user.profile?.name || "N/A"}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="MENTEE">Mentee</option>
                  <option value="MENTOR">Mentor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </td>
              <td style={styles.td}>
                {user.role === "MENTEE" && (
                  <button onClick={() => handleOpenModal(user)}>
                    Assign Mentor
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedMentee && (
        <AssignMentorModal
          mentors={mentors}
          onAssign={handleAssignMentor}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

const styles = {
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    background: "#f2f2f2",
  },
  td: { border: "1px solid #ddd", padding: "8px" },
};

export default AdminUsersPage;
