import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChucVu } from './ChucVu.model';
import { ChucVusResolver } from './ChucVus.resolver';
import { ChucVusService } from './ChucVus.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChucVu]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [ChucVusResolver, ChucVusService],
})
export class ChucVusModule {}
