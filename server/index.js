import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import UserRouter from './routes/User.routes.js';
import AiRouter from './routes/Ai.routes.js';
import connectDB from './configs/db.config.js';
import cookieParser from 'cookie-parser';
import PostRouter from './routes/Post.routes.js';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'developement') {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
}

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  storage: multer.memoryStorage(),
});

app.use('/api', UserRouter);
app.use('/api', AiRouter);
app.use('/api', PostRouter);


if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../client/dist');
  app.use(express.static(distPath));

  // 👇 Catch-all route for React
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connectDB();
  console.log("server is running");
})
