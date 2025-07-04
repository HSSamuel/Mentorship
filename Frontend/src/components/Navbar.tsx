import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      background: "#fff",
      borderBottom: "1px solid #ddd",
    },
    logo: {
      textDecoration: "none",
      color: "#333",
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    navList: {
      listStyle: "none",
      display: "flex",
      gap: "1rem",
    },
    navLink: {
      textDecoration: "none",
      color: "#555",
    },
  };

  return (
    <nav style={styles.nav}>
      <NavLink to="/dashboard" style={styles.logo}>
        MentorMe
      </NavLink>
      <ul style={styles.navList}>
        {user ? (
          <>
            <li>
              <NavLink to="/dashboard" style={styles.navLink}>
                Dashboard
              </NavLink>
            </li>
            {user.role === "MENTEE" && (
              <>
                <li>
                  <NavLink to="/mentors" style={styles.navLink}>
                    Find a Mentor
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-mentors" style={styles.navLink}>
                    My Mentors
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-requests" style={styles.navLink}>
                    My Requests
                  </NavLink>
                </li>
              </>
            )}
            {user.role === "MENTOR" && (
              <>
                <li>
                  <NavLink to="/requests" style={styles.navLink}>
                    Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/availability" style={styles.navLink}>
                    Availability
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/my-sessions" style={styles.navLink}>
                My Sessions
              </NavLink>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" style={styles.navLink}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;