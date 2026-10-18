import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";

@Injectable()
export class HealthService {
  constructor(private readonly database: DatabaseService) {}

  async check() {
    try {
      await this.database.$queryRaw`SELECT 1`;
      return { status: "ok" as const };
    } catch {
      throw new ServiceUnavailableException("Database unavailable");
    }
  }
}