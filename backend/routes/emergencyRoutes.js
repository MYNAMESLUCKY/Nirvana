import express from "express";
import { getEmergencyAlerts, createEmergencyAlert } from "../controllers/emergencyController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getEmergencyAlerts); // Public route to fetch all alerts
router.post("/", authenticateUser, createEmergencyAlert); // Protected route to create a new alert

export default router;