import express from 'express';
import { getCart, updateCart } from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protect all cart routes (must be logged in)
router.use(protect);

router.route('/')
  .get(getCart)
  .post(updateCart);

export default router;
