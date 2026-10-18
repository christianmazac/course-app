import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";

@Injectable()
export class SettingsRepository {
  constructor(private readonly database: DatabaseService) {}

  findPublicSettings() {
    return this.database.setting.findUnique({
      where: { id: "global" },
      select: {
        siteTitle: true,
        siteDescription: true,
        defaultLanguage: true
      }
    });
  }
}