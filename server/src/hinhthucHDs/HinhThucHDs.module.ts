import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { HinhThucHD } from './HinhThucHD.model';
import { HinhThucHDsResolver } from './HinhThucHDs.resolver';
import { HinhThucHDsService } from './HinhThucHDs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HinhThucHD, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [HinhThucHDsResolver, HinhThucHDsService, ActionDBsService],
})
export class HinhThucHDsModule {}
