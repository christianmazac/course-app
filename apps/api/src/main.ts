import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { z } from "zod";
import { AppModule } from "./app.module.js";

const environmentSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  ALLOWED_WEB_ORIGINS: z.string().default("http://localhost:8081")
});

async function bootstrap() {
  const environment = environmentSchema.parse(process.env);
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = environment.ALLOWED_WEB_ORIGINS.split(",")
    .map(origin => origin.trim())
    .filter(Boolean);

  app.setGlobalPrefix("api/v1");
  app.enableCors({
    origin: allowedOrigins,
    methods: ["GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  });
  app.enableShutdownHooks();
  await app.listen(environment.PORT, "0.0.0.0");
}

void bootstrap();