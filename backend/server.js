import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import incidentRoutes from "./routes/incidentRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import authRoutes from './routes/authRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());  // Allow CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use("/uploads", express.static("uploads")); 
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/incidents", incidentRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/history", historyRoutes); // <-- fixed here

// Start Server
const PORT = process.env.PORT || 5000;
/*app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); */

  app.listen(5000, '0.0.0.0', () => {
    console.log(`Server running on port 5000`);
  });
  
