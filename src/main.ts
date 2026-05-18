import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = NestFactory.create(AppModule);
  
  // 🆕 Allow Angular (port 4200) to call this API
  (await app).enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  });
  
  (await app).listen(3000);
}
bootstrap();
