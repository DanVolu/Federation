import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/federation";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");  
        console.log(mongoURI);
              
    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);        
    }
};


export default connectDB;