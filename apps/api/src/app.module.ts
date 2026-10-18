import { Module } from "@nestjs/common";
import { ContentModule } from "./content/content.module.js";
import { DatabaseModule } from "./database/database.module.js";
import { HealthModule } from "./health/health.module.js";
import { SettingsModule } from "./settings/settings.module.js";

@Module({
  imports: [DatabaseModule, HealthModule, SettingsModule, ContentModule]
})
export class AppModule {}