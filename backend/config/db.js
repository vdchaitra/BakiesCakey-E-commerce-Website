import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://chaitravmd05:BCakies200@cluster0.03ftbov.mongodb.net/BAKIESCAKERY').then(()=>console.log("DB Connected"));
    } catch (error) {
        console.error("DB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
