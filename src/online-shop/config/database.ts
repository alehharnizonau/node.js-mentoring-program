import mongoose from 'mongoose';

export const connect = async () => {
    const {MONGO_URI} = process.env;

    try {
        await mongoose.connect(String(MONGO_URI));
        console.log("Successfully connected to database");
    } catch (e) {
        console.log("DataBase connection failed");
        console.error(e);
    }
}