import mongoose from "mongoose";

const emergencyAlertSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ensure userId is required
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },

});

const EmergencyAlert = mongoose.model("EmergencyAlert", emergencyAlertSchema);

export default EmergencyAlert;