import express from 'express';
import { login, logout, signup } from '../controllers/User.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome back!", user: req.user });
});

export default router;