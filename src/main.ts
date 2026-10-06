import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Configure Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('LMS Backend API')
    .setDescription('NestJS REST API documentation for LMS Backend Management System')
    .setVersion('2.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Expose raw JSON spec endpoint for OpenAPI Generators
  app.getHttpAdapter().get('/api/docs-json', (req: any, res: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

  // Save swagger.json file for offline OpenAPI generation
  try {
    const swaggerPath = path.resolve(process.cwd(), 'swagger.json');
    fs.writeFileSync(swaggerPath, JSON.stringify(document, null, 2), { encoding: 'utf8' });
    logger.log(`OpenAPI specification exported to: ${swaggerPath}`);
  } catch (err) {
    logger.error('Failed to export swagger.json:', err);
  }

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
  logger.log(`NestJS Application is running on port: ${port}`);
  logger.log(`Swagger documentation UI available at: http://localhost:${port}/api/docs`);
  logger.log(`OpenAPI JSON spec available at: http://localhost:${port}/api/docs-json`);
}

bootstrap();

