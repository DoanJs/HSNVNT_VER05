import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { TonGiao } from './TonGiao.model';
import { TonGiaosService } from './TonGiaos.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';

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
  createTonGiao(@Args('tenTG') tenTG: string): Promise<TonGiao> {
    return this.tongiaosService.createTonGiao(tenTG);
  }

  @Mutation((returns) => TonGiao)
  @UseGuards(UpdateGuard)
  editTonGiao(
    @Args('tenTG') tenTG: string,
    @Args('id') id: number,
  ): Promise<TonGiao> {
    return this.tongiaosService.editTonGiao(tenTG, id);
  }

  @Mutation((returns) => TonGiao)
  @UseGuards(DeleteGuard)
  deleteTonGiao(@Args('id') id: number): Promise<TonGiao> {
    return this.tongiaosService.deleteTonGiao(id);
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
