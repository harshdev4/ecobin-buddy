import express from 'express';
import { analyseImage, chatAi } from '../controllers/Ai.controller.js';
import upload from '../configs/multer.config.js';

const router = express.Router();

router.post("/analyse-image", upload.single('file'), analyseImage);
router.post("/ai-chat", chatAi);

export default router;