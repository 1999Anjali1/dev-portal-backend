import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://dev-portal-frontend.vercel.app',
      /\.vercel\.app$/  // allows any vercel subdomain
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  });
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
