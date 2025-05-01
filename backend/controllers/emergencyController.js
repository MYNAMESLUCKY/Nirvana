import EmergencyAlert from "../models/EmergencyAlert.js";

// Fetch all emergency alerts
export const getEmergencyAlerts = async (req, res) => {
  try {
    const alerts = await EmergencyAlert.find();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch emergency alerts", error });
  }
};


export const createEmergencyAlert = async (req, res) => {
  try {
   
    const { name, contact, location, description, date, time } = req.body;

   // const userId = req.user.userId;
    const newAlert = new EmergencyAlert({
      name,
      contact,
      location,
      description,
      date,
      time,
      userId,
    });
    

    await newAlert.save();
    res.status(201).json({ message: "Emergency alert submitted successfully", });
  } catch (error) {
    console.error("Error creating emergency alert:", error); // Log error details
    res.status(500).json({ message: "Failed to submit emergency alert", error: error.message });
  }
};