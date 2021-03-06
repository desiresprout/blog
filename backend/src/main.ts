import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('shopping example')
    .setDescription('The shopping API description')
    .setVersion('1.0')
    .addTag('shopping')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser(COOKIE_SECRET));

  await app.listen(PORT || 4000);
}
bootstrap();
