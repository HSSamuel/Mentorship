import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [role, setRole] = useState<"MENTEE" | "MENTOR">("MENTEE");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await apiClient.post("/auth/register", { email, password, role });
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      backgroundColor: "#f7f9fb",
    },
    formContainer: {
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      backgroundColor: "white",
      width: "100%",
      maxWidth: "400px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#333",
    },
    input: {
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
    },
    passwordToggle: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginTop: "10px",
      fontSize: "14px",
    },
    select: {
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      backgroundColor: "white",
    },
    button: {
      padding: "12px",
      border: "none",
      borderRadius: "4px",
      backgroundColor: "#28a745",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    error: {
      color: "red",
      textAlign: "center",
    },
    success: {
      color: "green",
      textAlign: "center",
    },
    title: {
      textAlign: "center",
      marginBottom: "24px",
      color: "#333",
    },
    loginLink: {
      textAlign: "center",
      marginTop: "20px",
    },
  } as const;

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Create an Account</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              style={styles.input}
              type={showPassword ? "text" : "password"} // Dynamically change type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div style={styles.passwordToggle}>
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="role">
              I am a:
            </label>
            <select
              id="role"
              style={styles.select}
              value={role}
              onChange={(e) => setRole(e.target.value as "MENTEE" | "MENTOR")}
            >
              <option value="MENTEE">Mentee</option>
              <option value="MENTOR">Mentor</option>
            </select>
          </div>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#218838")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#28a745")
            }
          >
            Register
          </button>
        </form>
        <div style={styles.loginLink}>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
