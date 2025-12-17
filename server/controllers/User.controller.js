import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import Quiz from "../models/Quiz.model.js";
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
    let { name, email, password } = req.body;
    name = name.slice(0, 1).toUpperCase() + name.slice(1,);
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

export const fetchScore = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user.score);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const fetchLevel = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user.level.slice(0, 1).toUpperCase() + user.level.slice(1,));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const levelUp = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const current_level = user.level;
    if (current_level == 'easy') user.level = 'Medium';
    else user.level = 'Hard'
    await user.save();
    res.status(200).json({ message: `Level Jumped to ${user.level}`, level: user.level.slice(0, 1).toUpperCase() + user.level.slice(1,) });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const fetchUsersForLeaderBoard = async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 }).select('-password -tips');
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong while levelling up" });
  }
}

export const getUnattemptedQuiz = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "UserId not found" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const normalizedLevel =
      user.level.charAt(0).toUpperCase() + user.level.slice(1).toLowerCase();

    const unattemptedQuiz = await Quiz.find({
      difficulty: normalizedLevel,
      isAttempted: { $nin: [user._id] },
    });

    res.status(200).json(unattemptedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const attemptQuiz = async (req, res) => {
  try {
    const { userId, quizId, isCorrect } = req.body;

    const user = await User.findById(userId);
    const quiz = await Quiz.findOne({ id: quizId });

    if (!user || !quiz)
      return res.status(404).json({ message: "User or Quiz not found" });

    quiz.isAttempted.push(user._id);
    await quiz.save();

    if (isCorrect) user.score += 5;
    await user.save();

    res.status(200).json({ score: user.score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
