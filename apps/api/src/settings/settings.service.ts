import { Injectable, NotFoundException } from "@nestjs/common";
import { SettingsRepository } from "./settings.repository.js";

@Injectable()
export class SettingsService {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async getSettings() {
    const settings = await this.settingsRepository.findPublicSettings();
    if (!settings) {
      throw new NotFoundException("Site settings are not configured");
    }
    return settings;
  }
}