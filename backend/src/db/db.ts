import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);        
    }
};


export default connectDB;