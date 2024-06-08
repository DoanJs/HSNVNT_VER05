import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { TinhChatDT } from './TinhChatDT.model';
import { TinhChatDTsResolver } from './TinhChatDTs.resolver';
import { TinhChatDTsService } from './TinhChatDTs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TinhChatDT, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [TinhChatDTsResolver, TinhChatDTsService, ActionDBsService],
})
export class TinhChatDTsModule {}
