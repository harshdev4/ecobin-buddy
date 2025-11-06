import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import dotenv from 'dotenv';
dotenv.config();

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const JWT_SECRET = process.env.JWT_SECRET;


export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email already registered" });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = await User.create({ name, email, password: hashedPassword });

        // generate token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, COOKIE_OPTIONS);

        res.status(201).json({
            message: "Signup successful",
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });

        // Save token as cookie
        res.cookie("token", token, COOKIE_OPTIONS);

        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const logout = (_, res) => {
    res.clearCookie("token", COOKIE_OPTIONS);
    res.status(200).json({ message: "Logged out successfully" });
}

