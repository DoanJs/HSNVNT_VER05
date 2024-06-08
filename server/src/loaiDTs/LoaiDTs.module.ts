import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { LoaiDT } from './LoaiDT.model';
import { LoaiDTsResolver } from './LoaiDTs.resolver';
import { LoaiDTsService } from './LoaiDTs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoaiDT, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [LoaiDTsResolver, LoaiDTsService, ActionDBsService],
})
export class LoaiDTsModule {}
