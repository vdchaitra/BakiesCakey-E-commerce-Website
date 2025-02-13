import express from 'express';
import { listOrders, placeOrder, updateStatus, getUserOrders, verifyOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authMiddleware, getUserOrders);
orderRouter.get('/list', listOrders);
orderRouter.put('/status', updateStatus); // Ensure this matches the frontend URL

export default orderRouter;
