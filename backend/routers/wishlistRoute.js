import express from 'express';
import authMiddleware from '../middleware/auth.js';
import UserModel from '../models/UserModel.js';

const wishlistRouter = express.Router();

// Add item to wishlist
wishlistRouter.post('/add', authMiddleware, async (req, res) => {
    const { itemId } = req.body;
    try {
        const user = await UserModel.findById(req.body.userId);
        if (!user) throw Error('User not found');

        if (!user.wishlist.includes(itemId)) {
            user.wishlist.push(itemId);
            await user.save();
        }

        res.status(200).json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Remove item from wishlist
wishlistRouter.post('/remove', authMiddleware, async (req, res) => {
    const { itemId } = req.body;
    try {
        const user = await UserModel.findById(req.body.userId);
        if (!user) throw Error('User not found');

        user.wishlist = user.wishlist.filter(id => id.toString() !== itemId);
        await user.save();

        res.status(200).json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get user's wishlist
wishlistRouter.get('/list', authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId).populate('wishlist');
        if (!user) throw Error('User not found');

        res.status(200).json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default wishlistRouter;
