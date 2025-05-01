import express from "express";
import multer from "multer";
import { getIncidentReports, createIncidentReport } from "../controllers/incidentController.js";


const router = express.Router();


router.get("/", getIncidentReports);


router.post("/", createIncidentReport);


export default router;