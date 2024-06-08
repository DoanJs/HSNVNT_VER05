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
import { QuocTich } from 'src/quoctichs/QuocTich.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { DanToc } from './DanToc.model';
import { DanTocsService } from './DanTocs.service';
import { DanTocInput } from './type/DanToc.Input';

@Resolver(() => DanToc)
@UseGuards(GraphQLGuard)
export class DanTocsResolver {
  constructor(private dantocsService: DanTocsService) {}
  @Query((returns) => [DanToc])
  dantocs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<DanToc[]> {
    return this.dantocsService.dantocs(utilsParams);
  }

  @Query((returns) => DanToc)
  dantoc(@Args('id') id: number): Promise<DanToc> {
    return this.dantocsService.dantoc(id);
  }

  @Mutation((returns) => DanToc)
  @UseGuards(InsertGuard)
  createDanToc(
    @CurrentUser() user: any,
    @Args('danTocInput') danTocInput: DanTocInput,
  ): Promise<DanToc> {
    return this.dantocsService.createDanToc(danTocInput, user);
  }

  @Mutation((returns) => DanToc)
  @UseGuards(UpdateGuard)
  editDanToc(
    @CurrentUser() user: any,
    @Args('danTocInput') danTocInput: DanTocInput,
    @Args('id') id: number,
  ): Promise<DanToc> {
    return this.dantocsService.editDanToc(danTocInput, id, user);
  }

  @Mutation((returns) => DanToc)
  @UseGuards(DeleteGuard)
  deleteDanToc(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<DanToc> {
    return this.dantocsService.deleteDanToc(id, user);
  }

  //ResolveField

  @ResolveField((returns) => QuocTich)
  QuocTich(@Parent() dantoc: DanToc): Promise<QuocTich> {
    return this.dantocsService.QuocTich(dantoc);
  }

  @ResolveField((returns) => [DoiTuong])
  DoiTuongs(@Parent() dantoc: DanToc): Promise<DoiTuong[]> {
    return this.dantocsService.DoiTuongs(dantoc.MaDT);
  }

  @ResolveField(() => [CBCS])
  CBCSs(@Parent() danToc: DanToc): Promise<CBCS[]> {
    return this.dantocsService.CBCSs(danToc.MaDT);
  }
}
