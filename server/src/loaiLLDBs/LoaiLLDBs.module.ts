import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { LoaiLLDB } from './LoaiLLDB.model';
import { LoaiLLDBsResolver } from './LoaiLLDBs.resolver';
import { LoaiLLDBsService } from './LoaiLLDBs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoaiLLDB, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [LoaiLLDBsResolver, LoaiLLDBsService, ActionDBsService],
})
export class LoaiLLDBsModule {}
