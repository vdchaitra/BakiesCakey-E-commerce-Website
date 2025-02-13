import orderModel from '../models/orderModel.js';
import UserModel from '../models/UserModel.js';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });
    await newOrder.save();
    await UserModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const options = {
      amount: newOrder.amount * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    };
    const order = await instance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: "Error placing order. Please try again." });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error listing orders:', error);
    res.status(500).json({ success: false, message: "Error listing orders" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status updated." });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error retrieving user orders:', error);
    res.status(500).json({ success: false, message: "Error retrieving user orders" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, payment_id, signature } = req.body;
  try {
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${orderId}|${payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === signature) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error('Error verifying order:', error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};



export { placeOrder, listOrders, updateStatus, getUserOrders, verifyOrder };
