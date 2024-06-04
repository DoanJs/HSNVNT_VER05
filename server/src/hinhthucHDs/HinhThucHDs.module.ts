import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HinhThucHD } from './HinhThucHD.model';
import { HinhThucHDsResolver } from './HinhThucHDs.resolver';
import { HinhThucHDsService } from './HinhThucHDs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([HinhThucHD]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [HinhThucHDsResolver, HinhThucHDsService],
})
export class HinhThucHDsModule {}
