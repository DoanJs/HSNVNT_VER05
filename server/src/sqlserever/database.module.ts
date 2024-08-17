import { Module } from '@nestjs/common';
import { SQLServerAuthService } from './sqlserver.auth.service';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  providers: [DatabaseService, SQLServerAuthService],
})
export class DatabaseModule {}
