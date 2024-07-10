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
import { KetQuaXMDiaChi } from 'src/ketQuaXMDiaChis/KetQuaXMDiaChi.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BaoCaoPHDC } from './BaoCaoPHDC.model';
import { BaoCaoPHDCsService } from './BaoCaoPHDCs.service';
import { BaoCaoPHDCInput } from './type/BaoCaoPHDC.Input';
import { BaoCaoPHDC_CBCSType } from './type/BaoCaoPHDC_CBCS.type';
import { BaoCaoPHDC_CBCSInput } from './type/BaoCaoPHDC_CBCS.input';

@Resolver(() => BaoCaoPHDC)
@UseGuards(GraphQLGuard)
export class BaoCaoPHDCsResolver {
  constructor(private baocaoPHDCsService: BaoCaoPHDCsService) {}
  @Query((returns) => [BaoCaoPHDC])
  baocaoPHDCs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoPHDC[]> {
    return this.baocaoPHDCsService.baocaoPHDCs(utilsParams);
  }

  @Query((returns) => BaoCaoPHDC)
  baocaoPHDC(@Args('id') id: number): Promise<BaoCaoPHDC> {
    return this.baocaoPHDCsService.baocaoPHDC(id);
  }

  @Mutation((returns) => BaoCaoPHDC)
  @UseGuards(InsertGuard)
  createBaoCaoPHDC(
    @CurrentUser() user: any,
    @Args('baocaoPHDCInput') baocaoPHDCInput: BaoCaoPHDCInput,
  ): Promise<BaoCaoPHDC> {
    return this.baocaoPHDCsService.createBaoCaoPHDC(baocaoPHDCInput, user);
  }

  @Mutation((returns) => BaoCaoPHDC)
  @UseGuards(UpdateGuard)
  editBaoCaoPHDC(
    @CurrentUser() user: any,
    @Args('baocaoPHDCInput') baocaoPHDCInput: BaoCaoPHDCInput,
    @Args('id') id: number,
  ): Promise<BaoCaoPHDC> {
    return this.baocaoPHDCsService.editBaoCaoPHDC(baocaoPHDCInput, id, user);
  }

  @Mutation((returns) => BaoCaoPHDC)
  @UseGuards(DeleteGuard)
  deleteBaoCaoPHDC(
    @CurrentUser() user: any,
    @Args('baocaoPHDCInput') baocaoPHDCInput: BaoCaoPHDCInput,
    @Args('id') id: number,
  ): Promise<BaoCaoPHDC> {
    return this.baocaoPHDCsService.deleteBaoCaoPHDC(baocaoPHDCInput, id, user);
  }

  // many-to-many
  @Query((returns) => [BaoCaoPHDC_CBCSType])
  baocaoPHDCs_cbcss(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoPHDC_CBCSType[]> {
    return this.baocaoPHDCsService.baocaoPHDCs_cbcss(utilsParams);
  }

  @Mutation((returns) => BaoCaoPHDC_CBCSType)
  @UseGuards(InsertGuard)
  createBaoCaoPHDC_CBCS(
    @CurrentUser() user: any,
    @Args('baocaoPHDC_cbcsInput')
    baocaoPHDC_cbcsInput: BaoCaoPHDC_CBCSInput,
  ): Promise<BaoCaoPHDC_CBCSType> {
    return this.baocaoPHDCsService.createBaoCaoPHDC_CBCS(
      baocaoPHDC_cbcsInput,
      user,
    );
  }

  @Mutation((returns) => BaoCaoPHDC_CBCSType)
  @UseGuards(UpdateGuard)
  editBaoCaoPHDC_CBCS(
    @CurrentUser() user: any,
    @Args('baocaoPHDC_cbcsInput')
    baocaoPHDC_cbcsInput: BaoCaoPHDC_CBCSInput,
    @Args('MaBCPHDC') MaBCPHDC: number,
    @Args('MaCBCS') MaCBCS: number,
  ): Promise<BaoCaoPHDC_CBCSType> {
    return this.baocaoPHDCsService.editBaoCaoPHDC_CBCS(
      baocaoPHDC_cbcsInput,
      MaBCPHDC,
      MaCBCS,
      user,
    );
  }

  @Mutation((retursn) => BaoCaoPHDC_CBCSType)
  @UseGuards(DeleteGuard)
  deleteBaoCaoPHDC_CBCS(
    @CurrentUser() user: any,
    @Args('MaBCPHDC') MaBCPHDC: number,
    @Args('MaCBCS') MaCBCS: number,
  ): Promise<BaoCaoPHDC_CBCSType> {
    return this.baocaoPHDCsService.deleteBaoCaoPHDC_CBCS(
      MaBCPHDC,
      MaCBCS,
      user,
    );
  }
  // ResolveField
  @ResolveField((returns) => KetQuaTSNT)
  KetQuaTSNT(@Parent() baocaoPHDC: BaoCaoPHDC): Promise<KetQuaTSNT> {
    return this.baocaoPHDCsService.KetQuaTSNT(baocaoPHDC);
  }

  @ResolveField((returns) => [CBCS])
  TSThucHiens(@Parent() baocaoPHDC: BaoCaoPHDC): Promise<CBCS[]> {
    return this.baocaoPHDCsService.TSThucHiens(baocaoPHDC.MaBCPHDC);
  }

  @ResolveField((returns) => BaoCaoKQXMDiaChi)
  BaoCaoKQXMDiaChi(
    @Parent() baocaoPHDC: BaoCaoPHDC,
  ): Promise<BaoCaoKQXMDiaChi> {
    return this.baocaoPHDCsService.BaoCaoKQXMDiaChi(baocaoPHDC.MaBCPHDC);
  }

  @ResolveField((returns) => KetQuaXMDiaChi)
  KetQuaXMDiaChi(@Parent() baocaoPHDC: BaoCaoPHDC): Promise<KetQuaXMDiaChi> {
    return this.baocaoPHDCsService.KetQuaXMDiaChi(baocaoPHDC.MaBCPHDC);
  }
}
