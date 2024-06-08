import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { QuyetDinhTSNT } from './QuyetDinhTSNT.model';
import { QuyetDinhTSNTsResolver } from './QuyetDinhTSNTs.resolver';
import { QuyetDinhTSNTsService } from './QuyetDinhTSNTs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuyetDinhTSNT, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [QuyetDinhTSNTsResolver, QuyetDinhTSNTsService, ActionDBsService],
})
export class QuyetDinhTSNTsModule {}
