import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Crypto from 'crypto-js';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { Account } from './Account.model';
import { AccountInput } from './type/Account.input';
import { AccountExtendInput } from './type/AccountExtend.input';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) { }

  public readonly account_DataInput = (
    accountInput: AccountInput,
  ) => {
    return {
      Username: accountInput.Username ? `N'${accountInput.Username}'` : null,
      Password: accountInput.Password ? accountInput.Password : null,
      Role: accountInput.Role ? `N'${accountInput.Role}'` : null,
      Position: accountInput.Position ? `N'${accountInput.Position}'` : null,
    };
  };

  accounts(utilsParams: UtilsParamsInput): Promise<Account[]> {
    return this.accountRepository.query(
      `DECLARE @lengthTable INT
        SELECT @lengthTable = COUNT(*) FROM Accounts 
        SELECT * FROM Accounts WHERE ${utilsParams.condition ? utilsParams.condition : 'AccountID != 0'
      } 
        ORDER BY AccountID OFFSET 
        ${utilsParams.skip && utilsParams.skip > 0 ? utilsParams.skip : 0
      } ROWS FETCH NEXT 
        ${utilsParams.take && utilsParams.take > 0
        ? utilsParams.take
        : '@lengthTable'
      } ROWS ONLY
      `,
    );
  }

  async account(accountID: number): Promise<Account> {
    const result = await this.accountRepository.query(
      `SELECT * FROM Accounts WHERE AccountID = ${accountID}`,
    );
    return result[0];
  }

  async createAccount(accountInput: AccountInput): Promise<Account> {
    const { Username, Password, Role, Position } = this.account_DataInput(accountInput)
    const accountExist = await this.accountRepository.query(
      `SELECT * FROM Accounts WHERE Username = ${Username}`,
    );

    if (accountExist[0]) {
      throw new UnauthorizedException('Tài khoản này đã tồn tại!');
    }
    const hashPassword = Crypto.SHA512(Password).toString();
    const result = await this.accountRepository.query(
      `INSERT INTO Accounts 
        (Username, Password, Role, Position) 
        VALUES 
        (${Username}, '${hashPassword}', ${Role}, ${Position})
        SELECT * FROM Accounts WHERE AccountID = SCOPE_IDENTITY()
      `,
    );
    return result[0];
  }

  async editAccount(
    id: number,
    accountExtendInput: AccountExtendInput,
  ): Promise<Account> {
    const { AccountInput, PasswordOld } = accountExtendInput;
    const hashPasswordOld = Crypto.SHA512(PasswordOld).toString();

    const data = await this.accountRepository.query(
      `SELECT * FROM Accounts WHERE AccountID = ${id}`
    );
    const accountOld = data[0]

    if (accountOld.Username !== AccountInput.Username) {
      const accountExist = await this.accountRepository.query(
        `SELECT * FROM Accounts WHERE Username = '${AccountInput.Username}'`
      )
      if (accountExist[0]) {
        throw new UnauthorizedException('Tên tài khoản này đã tồn tại!');
      }
    }

    if (hashPasswordOld !== accountOld.Password) {
      throw new UnauthorizedException('Mật khẩu cũ không chính xác !');
    }

    if (!AccountInput.Password) {
      await this.accountRepository.query(
        `UPDATE Accounts SET Username = '${AccountInput.Username}' WHERE AccountID = ${id}`
      )
    } else {
      const hashPasswordNew = Crypto.SHA512(AccountInput.Password).toString();
      await this.accountRepository.query(
        `UPDATE Accounts 
        SET Username = '${AccountInput.Username}', 
        Password = '${hashPasswordNew}' 
        WHERE AccountID = ${id}`
      )
    }

    const account = await this.accountRepository.query(
      `SELECT * FROM Accounts WHERE AccountID = ${id}`
    )
    return account[0];
  }
}
