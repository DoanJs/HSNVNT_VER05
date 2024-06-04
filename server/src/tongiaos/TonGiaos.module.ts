import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TonGiao } from './TonGiao.model';
import { TonGiaosResolver } from './TonGiaos.resolver';
import { TonGiaosService } from './TonGiaos.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([TonGiao]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [TonGiaosResolver, TonGiaosService],
})
export class TonGiaosModule {}
