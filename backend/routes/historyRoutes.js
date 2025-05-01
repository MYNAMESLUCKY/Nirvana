import express from "express";
import { getHistory } from "../controllers/historyController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/history - Get combined history of incidents and emergencies
router.get("/", authenticateUser, getHistory);

export default router;