import IncidentReport from "../models/IncidentReport.js";
import path from "path";
import multer from "multer";


// Fetch all incident reports
export const getIncidentReports = async (req, res) => {
  try {
    const reports = await IncidentReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports", error });
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Submit a new incident report
export const createIncidentReport = async (req, res) => {
  try {
    const { reportType, location, description, date, time, contact } = req.body;
    const media = req.file ? `/uploads/${req.file.filename}` : null;

    const newReport = new IncidentReport({
      reportType,
      location,
      description, 
      date,
      time,
      media,
      contact,
    });

    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit report", error });
  }
};