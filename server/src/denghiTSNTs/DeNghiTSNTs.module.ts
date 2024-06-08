import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DeNghiTSNT } from './DeNghiTSNT.model';
import { DeNghiTSNTsResolver } from './DeNghiTSNTs.resolver';
import { DeNghiTSNTsService } from './DeNghiTSNTs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeNghiTSNT, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [DeNghiTSNTsResolver, DeNghiTSNTsService, ActionDBsService],
})
export class DeNghiTSNTsModule {}
