import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:3000'];

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  // 🔹 GLOBAL REQUEST LOGGER (DevOps gold)
  app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      );
    });

    next();
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`Application running on http://localhost:${port}`);
  console.log(`CORS enabled for: ${corsOrigins.join(', ')}`);
}

bootstrap();