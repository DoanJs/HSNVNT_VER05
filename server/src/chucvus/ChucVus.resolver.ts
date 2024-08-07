import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { ChucVu } from './ChucVu.model';
import { ChucVusService } from './ChucVus.service';

@Resolver(() => ChucVu)
@UseGuards(GraphQLGuard)
export class ChucVusResolver {
  constructor(private chucvusService: ChucVusService) {}

  @Query((returns) => [ChucVu])
  chucvus(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<ChucVu[]> {
    return this.chucvusService.chucVus(utilsParams);
  }

  @Query((returns) => ChucVu)
  chucvu(@Args('id') id: number): Promise<ChucVu> {
    return this.chucvusService.chucVu(id);
  }

  @Mutation((returns) => ChucVu)
  @UseGuards(InsertGuard)
  createChucVu(
    @CurrentUser() user: any,
    @Args('chucVu') chucVu: string,
  ): Promise<ChucVu> {
    return this.chucvusService.createChucVu(chucVu, user);
  }

  @Mutation((returns) => ChucVu)
  @UseGuards(UpdateGuard)
  editChucVu(
    @CurrentUser() user: any,
    @Args('chucVu') chucVu: string,
    @Args('id') id: number,
  ): Promise<ChucVu> {
    return this.chucvusService.editChucVu(chucVu, id, user);
  }

  @Mutation((returns) => ChucVu)
  @UseGuards(DeleteGuard)
  deleteChucVu(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<ChucVu> {
    return this.chucvusService.deleteChucVu(id, user);
  }

  //ResolveField

  @ResolveField((returns) => [CBCS])
  CBCSs(@Parent() chucVu: ChucVu): Promise<CBCS[]> {
    return this.chucvusService.CBCSs(chucVu.MaCV);
  }
}
