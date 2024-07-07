import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BaoCaoKTDN } from './BaoCaoKTDN.model';
import { BaoCaoKTDNsResolver } from './BaoCaoKTDNs.resolver';
import { BaoCaoKTDNsService } from './BaoCaoKTDNs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaoCaoKTDN, ActionDB]),
    AuthPassportModule,
    DataLoaderModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BaoCaoKTDNsResolver, BaoCaoKTDNsService, ActionDBsService],
})
export class BaoCaoKTDNsModule {}
