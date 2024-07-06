import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BaoCaoKQGH } from './BaoCaoKQGH.model';
import { BaoCaoKQGHsService } from './BaoCaoKQGHs.service';
import { BaoCaoKQGHInput } from './type/BaoCaoKQGH.input';
import { BaoCaoKQGH_CBCSInput } from './type/BaoCaoKQGH_CBCS.input';
import { BaoCaoKQGH_CBCSType } from './type/BaoCaoKQGH_CBCS.type';

@Resolver(() => BaoCaoKQGH)
@UseGuards(GraphQLGuard)
export class BaoCaoKQGHsResolver {
  constructor(private baocaoKQGHsService: BaoCaoKQGHsService) {}
  @Query((returns) => [BaoCaoKQGH])
  baocaoKQGHs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoKQGH[]> {
    return this.baocaoKQGHsService.baocaoKQGHs(utilsParams);
  }

  @Query((returns) => BaoCaoKQGH)
  baocaoKQGH(@Args('id') id: number): Promise<BaoCaoKQGH> {
    return this.baocaoKQGHsService.baocaoKQGH(id);
  }

  @Mutation((returns) => BaoCaoKQGH)
  @UseGuards(InsertGuard)
  createBaoCaoKQGH(
    @CurrentUser() user: any,
    @Args('baocaoKQGHInput') baocaoKQGHInput: BaoCaoKQGHInput,
  ): Promise<BaoCaoKQGH> {
    return this.baocaoKQGHsService.createBaoCaoKQGH(baocaoKQGHInput, user);
  }

  @Mutation((returns) => BaoCaoKQGH)
  @UseGuards(UpdateGuard)
  editBaoCaoKQGH(
    @CurrentUser() user: any,
    @Args('baocaoKQGHInput') baocaoKQGHInput: BaoCaoKQGHInput,
    @Args('id') id: number,
  ): Promise<BaoCaoKQGH> {
    return this.baocaoKQGHsService.editBaoCaoKQGH(baocaoKQGHInput, id, user);
  }

  @Mutation((retursn) => BaoCaoKQGH)
  @UseGuards(DeleteGuard)
  deleteBaoCaoKQGH(
    @CurrentUser() user: any,
    @Args('baocaoKQGHInput') baocaoKQGHInput: BaoCaoKQGHInput,
    @Args('id') id: number,
  ): Promise<BaoCaoKQGH> {
    return this.baocaoKQGHsService.deleteBaoCaoKQGH(baocaoKQGHInput, id, user);
  }

  // many-to-many
  @Query((returns) => [BaoCaoKQGH_CBCSType])
  baocaoKQGHs_cbcss(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoKQGH_CBCSType[]> {
    return this.baocaoKQGHsService.baocaoKQGHs_cbcss(utilsParams);
  }

  @Mutation((returns) => BaoCaoKQGH_CBCSType)
  @UseGuards(InsertGuard)
  createBaoCaoKQGH_CBCS(
    @CurrentUser() user: any,
    @Args('baocaokqgh_cbcsInput')
    baocaokqgh_cbcsInput: BaoCaoKQGH_CBCSInput,
  ): Promise<BaoCaoKQGH_CBCSType> {
    return this.baocaoKQGHsService.createBaoCaoKQGH_CBCS(
      baocaokqgh_cbcsInput,
      user,
    );
  }

  @Mutation((returns) => BaoCaoKQGH_CBCSType)
  @UseGuards(UpdateGuard)
  editBaoCaoKQGH_CBCS(
    @CurrentUser() user: any,
    @Args('baocaokqgh_cbcsInput')
    baocaokqgh_cbcsInput: BaoCaoKQGH_CBCSInput,
    @Args('MaBCKQGH') MaBCKQGH: number,
    @Args('MaCBCS') MaCBCS: number,
  ): Promise<BaoCaoKQGH_CBCSType> {
    return this.baocaoKQGHsService.editBaoCaoKQGH_CBCS(
      baocaokqgh_cbcsInput,
      MaBCKQGH,
      MaCBCS,
      user,
    );
  }

  @Mutation((retursn) => BaoCaoKQGH_CBCSType)
  @UseGuards(DeleteGuard)
  deleteBaoCaoKQGH_CBCS(
    @CurrentUser() user: any,
    @Args('MaBCKQGH') MaBCKQGH: number,
    @Args('MaCBCS') MaCBCS: number,
  ): Promise<BaoCaoKQGH_CBCSType> {
    return this.baocaoKQGHsService.deleteBaoCaoKQGH_CBCS(
      MaBCKQGH,
      MaCBCS,
      user,
    );
  }
  // ResolveField

  @ResolveField((returns) => KetQuaTSNT)
  KetQuaTSNT(@Parent() baocaoKQGH: BaoCaoKQGH): Promise<KetQuaTSNT> {
    return this.baocaoKQGHsService.KetQuaTSNT(baocaoKQGH);
  }

  @ResolveField((returns) => [CBCS])
  TSThucHiens(@Parent() baocaoKQGH: BaoCaoKQGH): Promise<CBCS[]> {
    return this.baocaoKQGHsService.TSThucHiens(baocaoKQGH.MaBCKQGH);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() baocaoKQGH: BaoCaoKQGH): Promise<CBCS> {
    return this.baocaoKQGHsService.LanhDaoPD(baocaoKQGH);
  }
}
