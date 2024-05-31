import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/Account.model';
import { SP_GET_DATA } from 'src/utils/mssql/query';
import { Repository } from 'typeorm';
import { AuthPassportService } from '../AuthPassport.service';

@Injectable()
export class ReadGuard implements CanActivate {
  constructor(
    // @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    console.log(req);

    // const account = await this.accountRepository.query(
    //   SP_GET_DATA(
    //     'Accounts',
    //     `'AccountID = ${req.user.AccountID}'`,
    //     'AccountID',
    //     0,
    //     0,
    //   ),
    // );
    // if (!account) {
    //   throw new UnauthorizedException('Account not exist!');
    // }
    // if (account[0].role !== 'admin') {
    //   return false;
    // }
    return true;
  }
}
