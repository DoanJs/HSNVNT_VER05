// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Account, AccountDocument } from '../../account/account.schema';

// @Injectable()
// export class ManagerLeaderAdminGuard implements CanActivate {
//   constructor(
//     @InjectModel(Account.name)
//     private readonly accountModel: Model<AccountDocument>,
//   ) {}
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const ctx = GqlExecutionContext.create(context);
//     const { req } = ctx.getContext();

//     const account = await this.accountModel.findById(req.user.id);
//     if (!account) {
//       throw new UnauthorizedException('Account not exist!');
//     }
//     if (account.role === 'admin' || account.role === 'manager' || account.role === 'leader') {
//       return true;
//     }
//     return false;
//   }
// }
