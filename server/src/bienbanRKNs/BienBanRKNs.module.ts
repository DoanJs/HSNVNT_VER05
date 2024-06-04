import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BienBanRKN } from './BienBanRKN.model';
import { BienBanRKNsResolver } from './BienBanRKNs.resolver';
import { BienBanRKNsService } from './BienBanRKNs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([BienBanRKN]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BienBanRKNsResolver, BienBanRKNsService],
})
export class BienBanRKNsModule {}
