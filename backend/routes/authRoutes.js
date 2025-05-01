import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup); // Public route
router.post('/login', login);   // Public route

// Example protected route
router.get('/dashboard', authenticateUser, (req, res) => {
  res.send('Welcome to your dashboard!');
});

export default router;