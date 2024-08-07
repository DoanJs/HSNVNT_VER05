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
import { BaoCaoKQXMQuanHe } from 'src/baocaoKQXMQuanHes/BaoCaoKQXMQuanHe.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { KetQuaXMQuanHe } from 'src/ketQuaXMQuanHes/KetQuaXMQuanHe.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BaoCaoPHQH } from './BaoCaoPHQH.model';
import { BaoCaoPHQHsService } from './BaoCaoPHQHs.service';
import { BaoCaoPHQHInput } from './type/BaoCaoPHQH.input';
import { BaoCaoPHQH_CBCSType } from './type/BaoCaoPHQH_CBCS.type';
import { BaoCaoPHQH_CBCSInput } from './type/BaoCaoPHQH_CBCS.input';

@Resolver(() => BaoCaoPHQH)
@UseGuards(GraphQLGuard)
export class BaoCaoPHQHsResolver {
  constructor(private baocaoPHQHsService: BaoCaoPHQHsService) {}
  @Query((returns) => [BaoCaoPHQH])
  baocaoPHQHs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoPHQH[]> {
    return this.baocaoPHQHsService.baocaoPHQHs(utilsParams);
  }

  @Query((returns) => BaoCaoPHQH)
  baocaoPHQH(@Args('id') id: number): Promise<BaoCaoPHQH> {
    return this.baocaoPHQHsService.baocaoPHQH(id);
  }

  @Mutation((returns) => BaoCaoPHQH)
  @UseGuards(InsertGuard)
  createBaoCaoPHQH(
    @CurrentUser() user: any,
    @Args('baocaoPHQHInput') baocaoPHQHInput: BaoCaoPHQHInput,
  ): Promise<BaoCaoPHQH> {
    return this.baocaoPHQHsService.createBaoCaoPHQH(baocaoPHQHInput, user);
  }

  @Mutation((returns) => BaoCaoPHQH)
  @UseGuards(UpdateGuard)
  editBaoCaoPHQH(
    @CurrentUser() user: any,
    @Args('baocaoPHQHInput') baocaoPHQHInput: BaoCaoPHQHInput,
    @Args('id') id: number,
  ): Promise<BaoCaoPHQH> {
    return this.baocaoPHQHsService.editBaoCaoPHQH(baocaoPHQHInput, id, user);
  }

  @Mutation((retursn) => BaoCaoPHQH)
  @UseGuards(DeleteGuard)
  deleteBaoCaoPHQH(
    @CurrentUser() user: any,
    @Args('baocaoPHQHInput') baocaoPHQHInput: BaoCaoPHQHInput,
    @Args('id') id: number,
  ): Promise<BaoCaoPHQH> {
    return this.baocaoPHQHsService.deleteBaoCaoPHQH(baocaoPHQHInput, id, user);
  }

  // many-to-many
  @Query((returns) => [BaoCaoPHQH_CBCSType])
  baocaoPHQHs_cbcss(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoPHQH_CBCSType[]> {
    return this.baocaoPHQHsService.baocaoPHQHs_cbcss(utilsParams);
  }

  @Mutation((returns) => BaoCaoPHQH_CBCSType)
  @UseGuards(InsertGuard)
  createBaoCaoPHQH_CBCS(
    @CurrentUser() user: any,
    @Args('baocaoPHQH_cbcsInput')
    baocaoPHQH_cbcsInput: BaoCaoPHQH_CBCSInput,
  ): Promise<BaoCaoPHQH_CBCSType> {
    return this.baocaoPHQHsService.createBaoCaoPHQH_CBCS(
      baocaoPHQH_cbcsInput,
      user,
    );
  }

  @Mutation((returns) => BaoCaoPHQH_CBCSType)
  @UseGuards(UpdateGuard)
  editBaoCaoPHQH_CBCS(
    @CurrentUser() user: any,
    @Args('baocaoPHQH_cbcsInput')
    baocaoPHQH_cbcsInput: BaoCaoPHQH_CBCSInput,
    @Args('MaBCPHQH') MaBCPHQH: number,
    @Args('MaCBCS') MaCBCS: number,
  ): Promise<BaoCaoPHQH_CBCSType> {
    return this.baocaoPHQHsService.editBaoCaoPHQH_CBCS(
      baocaoPHQH_cbcsInput,
      MaBCPHQH,
      MaCBCS,
      user,
    );
  }

  @Mutation((retursn) => BaoCaoPHQH_CBCSType)
  @UseGuards(DeleteGuard)
  deleteBaoCaoPHQH_CBCS(
    @CurrentUser() user: any,
    @Args('MaBCPHQH') MaBCPHQH: number,
    @Args('MaCBCS') MaCBCS: number,
  ): Promise<BaoCaoPHQH_CBCSType> {
    return this.baocaoPHQHsService.deleteBaoCaoPHQH_CBCS(
      MaBCPHQH,
      MaCBCS,
      user,
    );
  }

  // ResolveField
  @ResolveField((returns) => KetQuaTSNT)
  KetQuaTSNT(@Parent() baocaoPHQH: BaoCaoPHQH): Promise<KetQuaTSNT> {
    return this.baocaoPHQHsService.KetQuaTSNT(baocaoPHQH);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() baocaoPHQH: BaoCaoPHQH): Promise<CBCS> {
    return this.baocaoPHQHsService.LanhDaoPD(baocaoPHQH);
  }

  @ResolveField((returns) => CBCS)
  ToTruongTS(@Parent() baocaoPHQH: BaoCaoPHQH): Promise<CBCS> {
    return this.baocaoPHQHsService.ToTruongTS(baocaoPHQH);
  }

  @ResolveField((returns) => [CBCS])
  TSThucHiens(@Parent() baocaoPHQH: BaoCaoPHQH): Promise<CBCS[]> {
    return this.baocaoPHQHsService.TSThucHiens(baocaoPHQH.MaBCPHQH);
  }

  @ResolveField((returns) => BaoCaoKQXMQuanHe)
  BaoCaoKQXMQuanHe(
    @Parent() baocaoPHQH: BaoCaoPHQH,
  ): Promise<BaoCaoKQXMQuanHe> {
    return this.baocaoPHQHsService.BaoCaoKQXMQuanHe(baocaoPHQH.MaBCPHQH);
  }

  @ResolveField((returns) => KetQuaXMQuanHe)
  KetQuaXMQuanHe(@Parent() baocaoPHQH: BaoCaoPHQH): Promise<KetQuaXMQuanHe> {
    return this.baocaoPHQHsService.KetQuaXMQuanHe(baocaoPHQH.MaBCPHQH);
  }
}
