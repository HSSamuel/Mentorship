import { Router } from "express";
import {
  updateMyProfile,
  getMentorStats,
  getMenteeStats,
  getAllMentors,
  getAvailableSkills,
  getMentorPublicProfile, // Import the new controller
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

// New public route for mentor profiles
router.get(
  "/mentor/:id",
  [param("id").isMongoId().withMessage("Invalid mentor ID")],
  validateRequest,
  getMentorPublicProfile
);

// Existing authenticated routes
router.put(
  "/me/profile",
  authMiddleware,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("bio").notEmpty().withMessage("Bio is required"),
    body("skills").isArray({ min: 1 }).withMessage("Skills are required"),
    body("goals").notEmpty().withMessage("Goals are required"),
  ],
  validateRequest,
  updateMyProfile
);

router.get("/mentor/stats", authMiddleware, getMentorStats);
router.get("/mentee/stats", authMiddleware, getMenteeStats);
router.get("/mentors", authMiddleware, getAllMentors);
router.get("/skills", authMiddleware, getAvailableSkills);

export default router;
