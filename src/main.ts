import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as Sentry from "@sentry/node";
import * as dotenv from "dotenv";
import { SentryInterceptor } from "sentry/sentry.interceptor";

import { AppModule } from "./app.module";
import { Environment } from "./config/env.validation";

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV !== Environment.Production) {
    setupSwagger(app);
  }
  if (process.env.NODE_ENV !== Environment.Local) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
    });
    app.useGlobalInterceptors(new SentryInterceptor());
  }
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle(process.env.APP_SWAGGER_Title)
    .setDescription(process.env.APP_SWAGGER_Description)
    .setVersion(process.env.APP_SWAGGER_Version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
}
bootstrap();
