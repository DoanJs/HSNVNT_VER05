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
import { BaoCaoKQXMDiaChi } from 'src/baocaoKQXMDiaChis/BaoCaoKQXMDiaChi.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { DiaChiNV } from './DiaChiNV.model';
import { DiaChiNVsService } from './DiaChiNVs.service';
import { DiaChiNVInput } from './type/DiaChiNV.Input';

@Resolver(() => DiaChiNV)
@UseGuards(GraphQLGuard)
export class DiaChiNVsResolver {
  constructor(private diachiNVsService: DiaChiNVsService) {}
  @Query((returns) => [DiaChiNV])
  diachiNVs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<DiaChiNV[]> {
    return this.diachiNVsService.diachiNVs(utilsParams);
  }

  @Query((returns) => DiaChiNV)
  diachiNV(@Args('id') id: number): Promise<DiaChiNV> {
    return this.diachiNVsService.diachiNV(id);
  }

  @Mutation((returns) => DiaChiNV)
  @UseGuards(InsertGuard)
  createDiaChiNV(
    @CurrentUser() user: any,
    @Args('diachiNVInput') diachiNVInput: DiaChiNVInput,
  ): Promise<DiaChiNV> {
    return this.diachiNVsService.createDiaChiNV(diachiNVInput, user);
  }

  @Mutation((returns) => DiaChiNV)
  @UseGuards(UpdateGuard)
  editDiaChiNV(
    @CurrentUser() user: any,
    @Args('diachiNVInput') diachiNVInput: DiaChiNVInput,
    @Args('id') id: number,
  ): Promise<DiaChiNV> {
    return this.diachiNVsService.editDiaChiNV(diachiNVInput, id, user);
  }

  @Mutation((returns) => DiaChiNV)
  @UseGuards(DeleteGuard)
  deleteDiaChiNV(
    @CurrentUser() user: any,
    @Args('diachiNVInput') diachiNVInput: DiaChiNVInput,
    @Args('id') id: number,
  ): Promise<DiaChiNV> {
    return this.diachiNVsService.deleteDiaChiNV(diachiNVInput, id, user);
  }

  // ResolveField
  @ResolveField((returns) => KetQuaTSNT)
  KetQuaTSNT(@Parent() diachiNV: DiaChiNV): Promise<KetQuaTSNT> {
    return this.diachiNVsService.KetQuaTSNT(diachiNV);
  }

  @ResolveField((returns) => [CBCS])
  TSThucHiens(@Parent() diachiNV: DiaChiNV): Promise<CBCS[]> {
    return this.diachiNVsService.TSThucHiens(diachiNV.MaDC);
  }

  @ResolveField((returns) => BaoCaoKQXMDiaChi)
  BaoCaoKQXMDiaChi(@Parent() diachiNV: DiaChiNV): Promise<BaoCaoKQXMDiaChi> {
    return this.diachiNVsService.BaoCaoKQXMDiaChi(diachiNV.MaDC);
  }
}
