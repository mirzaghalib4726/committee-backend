import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.setGlobalPrefix(process.env.API_PREFIX || 'api/v1', {
    exclude: ['health', 'public/*path'],
  });
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  app.use(morgan('dev'));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
