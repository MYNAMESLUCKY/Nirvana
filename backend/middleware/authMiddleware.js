import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key"); // Replace "your_secret_key" with your actual secret
    req.user = decoded; // Attach decoded token (contains userId) to req.user
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};


export const authorizeRoles = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };