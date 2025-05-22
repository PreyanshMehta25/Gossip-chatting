import express from 'express';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import { connectMongoDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import {app,server} from './lib/socket.js'

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
// Try to load from the root directory first, then from the src directory
config({ path: path.resolve(__dirname, '../../.env') });
config({ path: path.resolve(__dirname, '.env') });


// Use environment variables directly
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
connectMongoDB(MONGODB_URI).then(() => console.log("MongoDB connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});