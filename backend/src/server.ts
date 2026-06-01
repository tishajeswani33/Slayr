import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { prisma } from './config/db.js';
import { redisClient } from './config/redis.js';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    console.log('🔄 Connecting to PostgreSQL database...');
    await prisma.$connect();
    console.log('🚀 Database connection initialized successfully');

    console.log('🔄 Connecting to Redis cache server...');
    await redisClient.connect();

    const server = app.listen(PORT, () => {
      console.log(`✨ Slayr Fashion Intelligence Server active on port ${PORT}`);
      console.log(`🌐 Health endpoint live at http://localhost:${PORT}/health`);
    });

    const shutdown = async (signal: string) => {
      console.log(`\n🛑 Received ${signal}. Shutting down server gracefully...`);
      server.close(async () => {
        console.log('🔒 HTTP server closed');
        await prisma.$disconnect();
        console.log('🔌 PostgreSQL database disconnected');
        await redisClient.quit();
        console.log('🔌 Redis cache server disconnected');
        console.log('👋 Goodbye!');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('💥 CRITICAL INITIALIZATION ERROR:', error);
    process.exit(1);
  }
}

bootstrap();
