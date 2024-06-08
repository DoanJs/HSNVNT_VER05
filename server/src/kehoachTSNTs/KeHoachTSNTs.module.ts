import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { KeHoachTSNT } from './KeHoachTSNT.model';
import { KeHoachTSNTsResolver } from './KeHoachTSNTs.resolver';
import { KeHoachTSNTsService } from './KeHoachTSNTs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([KeHoachTSNT, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [KeHoachTSNTsResolver, KeHoachTSNTsService, ActionDBsService],
})
export class KeHoachTSNTsModule {}
