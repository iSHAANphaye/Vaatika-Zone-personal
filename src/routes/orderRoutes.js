import express from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes below this line
router.use(protect);

router.post('/', createOrder);
router.get('/', getMyOrders);

export default router;
