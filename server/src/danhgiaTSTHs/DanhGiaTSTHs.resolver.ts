import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { DanhGiaTSTH } from './DanhGiaTSTH.model';
import { DanhGiaTSTHsService } from './DanhGiaTSTHs.service';
import { DanhGiaTSTHInput } from './type/DanhGiaTSTH.input';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';

@Resolver(() => DanhGiaTSTH)
@UseGuards(GraphQLGuard)
export class DanhGiaTSTHsResolver {
  constructor(private danhgiaTSTHsService: DanhGiaTSTHsService) {}
  @Query((returns) => [DanhGiaTSTH])
  danhgiaTSTHs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<DanhGiaTSTH[]> {
    return this.danhgiaTSTHsService.danhgiaTSTHs(utilsParams);
  }

  @Query((returns) => DanhGiaTSTH)
  danhgiaTSTH(@Args('id') id: number): Promise<DanhGiaTSTH> {
    return this.danhgiaTSTHsService.danhgiaTSTH(id);
  }

  @Mutation((returns) => DanhGiaTSTH)
  @UseGuards(InsertGuard)
  createDanhGiaTSTH(
    @CurrentUser() user: any,
    @Args('danhgiaTSTHInput') danhgiaTSTHInput: DanhGiaTSTHInput,
  ): Promise<DanhGiaTSTH> {
    return this.danhgiaTSTHsService.createDanhGiaTSTH(danhgiaTSTHInput, user);
  }

  @Mutation((returns) => DanhGiaTSTH)
  @UseGuards(UpdateGuard)
  editDanhGiaTSTH(
    @CurrentUser() user: any,
    @Args('danhgiaTSTHInput') danhgiaTSTHInput: DanhGiaTSTHInput,
    @Args('id') id: number,
  ): Promise<DanhGiaTSTH> {
    return this.danhgiaTSTHsService.editDanhGiaTSTH(danhgiaTSTHInput, id, user);
  }

  @Mutation((returns) => DanhGiaTSTH)
  @UseGuards(DeleteGuard)
  deleteDanhGiaTSTH(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<DanhGiaTSTH> {
    return this.danhgiaTSTHsService.deleteDanhGiaTSTH(id, user);
  }

  // ResolveField
  @ResolveField((returns) => KetQuaTSNT)
  KetQuaTSNT(@Parent() danhgiaTSTH: DanhGiaTSTH): Promise<KetQuaTSNT> {
    return this.danhgiaTSTHsService.KetQuaTSNT(danhgiaTSTH);
  }

  @ResolveField((returns) => CBCS)
  CBCS(@Parent() danhgiaTSTH: DanhGiaTSTH): Promise<CBCS> {
    return this.danhgiaTSTHsService.CBCS(danhgiaTSTH);
  }
}
