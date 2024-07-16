import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { Account } from './Account.model';
import { AccountResolver } from './Account.resolver';
import { AccountService } from './Account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, ActionDB]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [AccountResolver, AccountService, ActionDBsService],
})
export class AccountModule {}
