import { Injectable } from '@nestjs/common';
import { SQLServerConfig } from './database.function';
import { DatabaseService } from './database.service';

@Injectable()
export class SQLServerAuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async SQLServerAuth(username: string, password: string) {
    await this.databaseService.changeConnectionConfig(
      SQLServerConfig(username, password),
    );
    return this.databaseService.getDataSource();
  }
}
