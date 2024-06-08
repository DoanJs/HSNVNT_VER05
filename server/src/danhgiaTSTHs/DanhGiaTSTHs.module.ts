import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DanhGiaTSTH } from './DanhGiaTSTH.model';
import { DanhGiaTSTHsResolver } from './DanhGiaTSTHs.resolver';
import { DanhGiaTSTHsService } from './DanhGiaTSTHs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DanhGiaTSTH, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
    DataLoaderModule,
  ],
  providers: [DanhGiaTSTHsResolver, DanhGiaTSTHsService, ActionDBsService],
})
export class DanhGiaTSTHsModule {}
