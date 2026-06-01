import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { globalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRouter from './routes/auth.js';
import outfitsRouter from './routes/outfits.js';
import feedRouter from './routes/feed.js';
import trendsRouter from './routes/trends.js';
import moodboardsRouter from './routes/moodboards.js';

const app = express();

// ─── Global Middlewares ─────────────────────────────────────────────

app.use(helmet());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(compression());

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

app.use('/api', globalLimiter);

// ─── API Routes ─────────────────────────────────────────────────────

app.use('/api/auth', authRouter);
app.use('/api/outfits', outfitsRouter);
app.use('/api/feed', feedRouter);
app.use('/api/trends', trendsRouter);
app.use('/api/moodboards', moodboardsRouter);

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(errorHandler);

export default app;
