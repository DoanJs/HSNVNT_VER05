import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { TonGiao } from './TonGiao.model';
import { TonGiaosResolver } from './TonGiaos.resolver';
import { TonGiaosService } from './TonGiaos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TonGiao, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [TonGiaosResolver, TonGiaosService, ActionDBsService],
})
export class TonGiaosModule {}
