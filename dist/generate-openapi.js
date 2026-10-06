"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const fs = require("fs");
const path = require("path");
async function generateOpenApiSpec() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: false });
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
    const outputPath = path.resolve(process.cwd(), 'swagger.json');
    fs.writeFileSync(outputPath, JSON.stringify(document, null, 2), { encoding: 'utf8' });
    console.log(`[OpenAPI Generator] Successfully generated OpenAPI spec to: ${outputPath}`);
    await app.close();
}
generateOpenApiSpec().catch((err) => {
    console.error('[OpenAPI Generator] Error generating spec:', err);
    process.exit(1);
});
//# sourceMappingURL=generate-openapi.js.map