import mongoose from "mongoose";

const incidentReportSchema = new mongoose.Schema({
  reportType: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  media: { type: String, default: null }, // File path for uploaded media
  contact: { type: String, default: null },
  status: { type: String, default: "Pending" },
});

const IncidentReport = mongoose.model("IncidentReport", incidentReportSchema);

export default IncidentReport; // Ensure this is a default export