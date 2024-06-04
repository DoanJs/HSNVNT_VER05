import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TinhChatDT } from './TinhChatDT.model';
import { TinhChatDTsResolver } from './TinhChatDTs.resolver';
import { TinhChatDTsService } from './TinhChatDTs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([TinhChatDT]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [TinhChatDTsResolver, TinhChatDTsService],
})
export class TinhChatDTsModule {}
