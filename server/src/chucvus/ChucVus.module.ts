import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { ChucVu } from './ChucVu.model';
import { ChucVusResolver } from './ChucVus.resolver';
import { ChucVusService } from './ChucVus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChucVu, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [ChucVusResolver, ChucVusService, ActionDBsService],
})
export class ChucVusModule {}
