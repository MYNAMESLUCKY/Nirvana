import Report from "../models/Report.js";

// Fetch all reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports", error });
  }
};

// Create a new report
export const createReport = async (req, res) => {
  try {
    const { reportType, location, description, date, time, contact } = req.body;
    const media = req.file ? `/uploads/${req.file.filename}` : null;

    const newReport = new Report({
      reportType,
      location,
      description,
      date,
      time,
      media,
      contact,
    });

    await newReport.save();
    res.status(201).json({ message: "Report created successfully", report: newReport });
  } catch (error) {
    res.status(500).json({ message: "Failed to create report", error });
  }
};