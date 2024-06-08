import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DiaChiNV } from './DiaChiNV.model';
import { DiaChiNVsResolver } from './DiaChiNVs.resolver';
import { DiaChiNVsService } from './DiaChiNVs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiaChiNV, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [DiaChiNVsResolver, DiaChiNVsService, ActionDBsService],
})
export class DiaChiNVsModule {}
