import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/', userRouter);


// Serve static files from the ../uploads directory
app.use('/uploads', express.static(join(__dirname, '../uploads')));

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => res.send('Server is ready'));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
