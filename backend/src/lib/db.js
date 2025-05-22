import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
// Try to load from the root directory first, then from the src directory
config({ path: path.resolve(__dirname, '../../../.env') });
config({ path: path.resolve(__dirname, '../.env') });

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