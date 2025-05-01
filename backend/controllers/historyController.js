import Incident from "../models/IncidentReport.js";
import Emergency from "../models/EmergencyAlert.js";

export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user.id` contains the authenticated user's ID

    const history = await Incident.aggregate([
      // Filter the incidents for the authenticated user
      { $match: { userId } },

      // Add a "type" field to distinguish incidents from emergencies
      { $addFields: { type: "incident" } },

      // Merge with the emergencies collection
      {
        $unionWith: {
          coll: "emergencies", // Merge with the emergencies collection
          pipeline: [
            { $match: { userId } }, // Filter emergencies for the authenticated user
            { $addFields: { type: "emergency" } }, // Add "type" field for emergencies
          ],
        },
      },

      // Sort the combined results by date and time
      { $sort: { date: -1, time: -1 } },
    ]);

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Failed to fetch history", error });
  }
};