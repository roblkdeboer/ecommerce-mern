import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// Post request to create a new user
router.route('/').post(protect, addOrderItems);

// Get request to get an order by id
router.route('/:id').get(protect, getOrderById);

export default router;
