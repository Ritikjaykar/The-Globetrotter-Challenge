// backend/routes/destinationRoutes.js
import express from 'express';
import { getAIDestinations } from '../controllers/destinationController.js';

const router = express.Router();
router.get('/ai', getAIDestinations);
export default router;