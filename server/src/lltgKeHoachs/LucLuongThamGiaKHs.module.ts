import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { LucLuongThamGiaKH } from './LucLuongThamGiaKH.model';
import { LucLuongThamGiaKHsResolver } from './LucLuongThamGiaKHs.resolver';
import { LucLuongThamGiaKHsService } from './LucLuongThamGiaKHs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LucLuongThamGiaKH, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [
    LucLuongThamGiaKHsResolver,
    LucLuongThamGiaKHsService,
    ActionDBsService,
  ],
})
export class LucLuongThamGiaKHsModule {}
