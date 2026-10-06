"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('LMS Backend API')
        .setDescription('NestJS REST API documentation for LMS Backend Management System')
        .setVersion('2.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.getHttpAdapter().get('/api/docs-json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(document);
    });
    try {
        const swaggerPath = path.resolve(process.cwd(), 'swagger.json');
        fs.writeFileSync(swaggerPath, JSON.stringify(document, null, 2), { encoding: 'utf8' });
        logger.log(`OpenAPI specification exported to: ${swaggerPath}`);
    }
    catch (err) {
        logger.error('Failed to export swagger.json:', err);
    }
    const port = process.env.APP_PORT || 3000;
    await app.listen(port);
    logger.log(`NestJS Application is running on port: ${port}`);
    logger.log(`Swagger documentation UI available at: http://localhost:${port}/api/docs`);
    logger.log(`OpenAPI JSON spec available at: http://localhost:${port}/api/docs-json`);
}
bootstrap();
//# sourceMappingURL=main.js.map