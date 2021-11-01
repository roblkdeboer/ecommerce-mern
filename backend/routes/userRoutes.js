import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Post request to login and call authUser
router.post('/login', authUser);
// Post request to create a new user
router.route('/').post(registerUser);

// Post request to return a logged in user
router.route('/profile').get(protect, getUserProfile);

export default router;
