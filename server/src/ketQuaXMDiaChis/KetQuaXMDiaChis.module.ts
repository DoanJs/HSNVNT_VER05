import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { KetQuaXMDiaChi } from './KetQuaXMDiaChi.model';
import { KetQuaXMDiaChisResolver } from './KetQuaXMDiaChis.resolver';
import { KetQuaXMDiaChisService } from './KetQuaXMDiaChis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([KetQuaXMDiaChi, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [
    KetQuaXMDiaChisResolver,
    KetQuaXMDiaChisService,
    ActionDBsService,
  ],
})
export class KetQuaXMDiaChisModule {}
