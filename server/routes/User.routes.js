import express from 'express';
import { attemptQuiz, fetchScore, getUnattemptedQuiz, login, logout, signup } from '../controllers/User.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/fetchScore/:userId", verifyToken, fetchScore);
router.get("/fetch-quiz/:userId", verifyToken, getUnattemptedQuiz);
router.post("/quiz/attempt", verifyToken, attemptQuiz);
router.get("/me", verifyToken, (req, res) => {
  res.json({ message: "Welcome back!", user: req.user });
});

export default router;