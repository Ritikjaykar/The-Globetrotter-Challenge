// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // ✅ keep this path as-is
import destinationRoutes from './routes/destinationRoutes.js';

import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandlers.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/destinations', destinationRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
