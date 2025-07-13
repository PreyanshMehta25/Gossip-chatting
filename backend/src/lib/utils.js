import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Use environment variables directly
const JWT_SECRET = "mysecretkey";
const NODE_ENV = process.env.NODE_ENV === "production";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // in milli seconds
        httpOnly: true, // prevent XSS attack, cross-site scripting attacks
        sameSite: "strict", // prevent CSRF attack, cross-site request forgery attacks
        secure: NODE_ENV !== "development"
    });
    return token;
};
