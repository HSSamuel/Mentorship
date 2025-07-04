import { Router } from "express";
import {
  getAllUsers,
  updateUserRole,
  getAllMatches,
  getAllSessions,
  assignMentor,
  getStats,
} from "../controllers/admin.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.put("/users/:id/role", authMiddleware, adminMiddleware, updateUserRole);
router.get("/matches", authMiddleware, adminMiddleware, getAllMatches);
router.get("/sessions", authMiddleware, adminMiddleware, getAllSessions);
router.post("/assign", authMiddleware, adminMiddleware, assignMentor);
router.get("/stats", authMiddleware, adminMiddleware, getStats);

export default router;
