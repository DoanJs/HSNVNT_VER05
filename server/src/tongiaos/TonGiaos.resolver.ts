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
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { TonGiao } from './TonGiao.model';
import { TonGiaosService } from './TonGiaos.service';

@Resolver(() => TonGiao)
@UseGuards(GraphQLGuard)
export class TonGiaosResolver {
  constructor(private tongiaosService: TonGiaosService) {}
  @Query((returns) => [TonGiao])
  tonGiaos(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<TonGiao[]> {
    return this.tongiaosService.tonGiaos(utilsParams);
  }

  @Query((returns) => TonGiao)
  tonGiao(@Args('id') id: number): Promise<TonGiao> {
    return this.tongiaosService.tonGiao(id);
  }

  @Mutation((returns) => TonGiao)
  @UseGuards(InsertGuard)
  createTonGiao(
    @CurrentUser() user: any,
    @Args('tenTG') tenTG: string,
  ): Promise<TonGiao> {
    return this.tongiaosService.createTonGiao(tenTG, user);
  }

  @Mutation((returns) => TonGiao)
  @UseGuards(UpdateGuard)
  editTonGiao(
    @CurrentUser() user: any,
    @Args('tenTG') tenTG: string,
    @Args('id') id: number,
  ): Promise<TonGiao> {
    return this.tongiaosService.editTonGiao(tenTG, id, user);
  }

  @Mutation((returns) => TonGiao)
  @UseGuards(DeleteGuard)
  deleteTonGiao(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<TonGiao> {
    return this.tongiaosService.deleteTonGiao(id, user);
  }

  // ResolveField

  @ResolveField((returns) => [DoiTuong])
  DoiTuongs(@Parent() tongiao: TonGiao): Promise<DoiTuong[]> {
    return this.tongiaosService.DoiTuongs(tongiao.MaTG);
  }

  @ResolveField((returns) => [CBCS])
  CBCSs(@Parent() tongiao: TonGiao): Promise<CBCS[]> {
    return this.tongiaosService.CBCSs(tongiao.MaTG);
  }
}
