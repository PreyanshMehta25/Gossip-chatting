import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function connectMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.log(`MongoDB not connected, error: ${error}`);
    }
}

export { connectMongoDB };