import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BaoCaoPHDC } from './BaoCaoPHDC.model';
import { BaoCaoPHDCsResolver } from './BaoCaoPHDCs.resolver';
import { BaoCaoPHDCsService } from './BaoCaoPHDCs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaoCaoPHDC, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BaoCaoPHDCsResolver, BaoCaoPHDCsService, ActionDBsService],
})
export class BaoCaoPHDCsModule {}
