import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// Post request to create a new user
router.route('/').post(protect, addOrderItems);

export default router;
