import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// Post request to create a new user
router.route('/').post(protect, addOrderItems);

// Retreive a user's orders
// This must be above get an order by ID route
router.route('/myorders').get(protect, getMyOrders);

// Get request to get an order by id
router.route('/:id').get(protect, getOrderById);

// Update order to paid
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
