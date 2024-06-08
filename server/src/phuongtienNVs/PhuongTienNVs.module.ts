import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import PhuongTienNV from './PhuongTienNV.model';
import { PhuongTienNVsResolver } from './PhuongTienNVs.resolver';
import { PhuongTienNVsService } from './PhuongTienNVs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhuongTienNV, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [PhuongTienNVsResolver, PhuongTienNVsService, ActionDBsService],
})
export class PhuongTienNVsModule {}
