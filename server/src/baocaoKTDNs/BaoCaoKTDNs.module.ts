import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaoCaoKTDN } from './BaoCaoKTDN.model';
import { BaoCaoKTDNsResolver } from './BaoCaoKTDNs.resolver';
import { BaoCaoKTDNsService } from './BaoCaoKTDNs.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaoCaoKTDN, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BaoCaoKTDNsResolver, BaoCaoKTDNsService, ActionDBsService],
})
export class BaoCaoKTDNsModule {}
