import express from 'express';
import connectDB from './config/db.js';
import cakeRouter from './routers/cakeRoute.js';
import cors from 'cors';
import userRouter from './routers/userRoute.js';
import cartRouter from './routers/cartRoute.js';
import orderRouter from './routers/orderRoute.js';
import wishlistRouter from './routers/wishlistRoute.js';
import UserModel from './models/UserModel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))

connectDB();



app.get('/', (req, res) => {
    res.send('Welcome to Bakies Cakery API');
});

app.use('/api/cake', cakeRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/wishlist', wishlistRouter);

const sendResetEmail = (email, link) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        html: `<p>You requested for password reset</p><h5>Click on this <a href=${link}>link</a> to reset your password</h5>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

app.post('/forgetpassword', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ Status: 'User not exist' });
        }

        const secret = process.env.JWT_SECRET + user.password;
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '5m' });
        const link = `http://localhost:4000/reset-password/${user._id}/${token}`;

        console.log(link);
        sendResetEmail(email, link);
        res.json({ Status: 'success' });
    } catch (error) {
        console.error('Error in forgetpassword:', error);
        res.json({ Status: 'error' });
    }
});

app.get('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    try {
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
            return res.json({ status: 'Invalid link or expired' });
        }

        const secret = process.env.JWT_SECRET + user.password;
        try {
            const verify = jwt.verify(token, secret);
            // Render the EJS template
            res.render('resetPassword', {email:verify.email,status :"not verify"});
        } catch (error) {
            console.log(error);
            res.send('Not Verified');
        }
    } catch (error) {
        console.error('Error in reset-password GET:', error);
        res.send('Invalid link or expired');
    }
});

app.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ status: 'Passwords do not match' });
    }

    try {
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({ status: 'Invalid link or expired' });
        }

        const secret = process.env.JWT_SECRET + user.password;
        try {
            jwt.verify(token, secret);
            const hashedPassword = await bcrypt.hash(password, 10);

            await UserModel.updateOne(
                { _id: id },
                { $set: { password: hashedPassword } }
            );

            res.json({ status: 'Password reset successfully' });
        } catch (error) {
            console.log(error);
            res.json({ status: 'Not Verified' });
        }
    } catch (error) {
        console.error('Error in reset-password POST:', error);
        res.json({ status: 'Invalid link or expired' });
    }
});


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
