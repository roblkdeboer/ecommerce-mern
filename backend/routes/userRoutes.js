import express from 'express';
const router = express.Router();
import { authUser, getUserProfile } from '../controllers/userController.js';

// Post request to login and call authUser
router.post('/login', authUser);

router.route('/profile').get(getUserProfile);

export default router;
