import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("DB connected successfully!!");
    } catch (error) {
        console.log("DB connection Error: ", error);
        process.exit(1);
    }
}

export default connectDB;