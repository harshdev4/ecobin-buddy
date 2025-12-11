import express from 'express';
import { fetchPost, submitPost } from '../controllers/Post.controller.js';
import upload from '../configs/multer.config.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/submit-post', verifyToken, upload.single('image'), submitPost);
router.get('/fetch-posts', fetchPost);

export default router;