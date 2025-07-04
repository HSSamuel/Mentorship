// src/index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { createServer } from "http";
import { Server } from "socket.io";

// Import all route handlers
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import requestRoutes from "./routes/request.routes";
// import sessionRoutes from "./routes/session.routes"; // Make sure this file exists and is correctly named
import adminRoutes from "./routes/admin.routes";

// Import passport config and socket service
import "./config/passport";
import { initializeSocket } from "./services/socket.service";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Session Middleware
app.use(
  session({
    secret: process.env.JWT_SECRET || "a-default-session-secret", // Use a strong secret from .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
// app.use("/api/sessions", sessionRoutes);
app.use("/api/admin", adminRoutes);

// Create HTTP server and Socket.IO instance
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Initialize Socket.IO logic
initializeSocket(io);

// Connect to MongoDB and Then Start Server
const startServer = async () => {
  if (!MONGO_URI) {
    console.error("🔴 MONGO_URI is not defined in .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("🟢 MongoDB connected successfully");

    // Use the httpServer to listen, which includes both Express and Socket.IO
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("🔴 Could not connect to MongoDB");
    console.error(error);
    process.exit(1);
  }
};

startServer();
