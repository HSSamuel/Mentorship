import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

// Define the shape of the user and context
interface User {
  id: string;
  email: string;
  role: "ADMIN" | "MENTOR" | "MENTEE";
  profile?: {
    name?: string;
    bio?: string;
    skills?: string[];
    goals?: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        // Set token for API client
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          // Fetch user info with the token
          const response = await apiClient.get("/auth/me");
          setUser(response.data);
        } catch (error) {
          // Token is invalid or expired
          localStorage.removeItem("authToken");
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, [token]);

  const login = async (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
    // The useEffect will trigger to fetch the user
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    delete apiClient.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context (changed to a function declaration)
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
