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
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BaoCaoPHPT } from './BaoCaoPHPT.model';
import { BaoCaoPHPTsService } from './BaoCaoPHPTs.service';
import { BaoCaoPHPTInput } from './type/BaoCaoPHPT.input';
import { BaoCaoPHPT_CBCSType } from './type/BaoCaoPHPT_CBCS.type';
import { BaoCaoPHPT_CBCSInput } from './type/BaoCaoPHDC_CBCS.input';

@Resolver(() => BaoCaoPHPT)
@UseGuards(GraphQLGuard)
export class BaoCaoPHPTsResolver {
  constructor(private baocaoPHPTsService: BaoCaoPHPTsService) {}
  @Query((returns) => [BaoCaoPHPT])
  baocaoPHPTs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoPHPT[]> {
    return this.baocaoPHPTsService.baocaoPHPTs(utilsParams);
  }

  @Query((returns) => BaoCaoPHPT)
  baocaoPHPT(@Args('id') id: number): Promise<BaoCaoPHPT> {
    return this.baocaoPHPTsService.baocaoPHPT(id);
  }

  @Mutation((returns) => BaoCaoPHPT)
  @UseGuards(InsertGuard)
  createBaoCaoPHPT(
    @CurrentUser() user: any,
    @Args('baocaoPHPTInput') baocaoPHPTInput: BaoCaoPHPTInput,
  ): Promise<BaoCaoPHPT> {
    return this.baocaoPHPTsService.createBaoCaoPHPT(baocaoPHPTInput, user);
  }

  @Mutation((returns) => BaoCaoPHPT)
  @UseGuards(UpdateGuard)
  editBaoCaoPHPT(
    @CurrentUser() user: any,
    @Args('baocaoPHPTInput') baocaoPHPTInput: BaoCaoPHPTInput,
    @Args('id') id: number,
  ): Promise<BaoCaoPHPT> {
    return this.baocaoPHPTsService.editBaoCaoPHPT(baocaoPHPTInput, id, user);
  }

  @Mutation((returns) => BaoCaoPHPT)
  @UseGuards(DeleteGuard)
  deleteBaoCaoPHPT(
    @CurrentUser() user: any,
    @Args('baocaoPHPTInput') baocaoPHPTInput: BaoCaoPHPTInput,
    @Args('id') id: number,
  ): Promise<BaoCaoPHPT> {
    return this.baocaoPHPTsService.deleteBaoCaoPHPT(baocaoPHPTInput, id, user);
  }

  // many-to-many
  @Query((returns) => [BaoCaoPHPT_CBCSType])
  baocaoPHPTs_cbcss(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoPHPT_CBCSType[]> {
    return this.baocaoPHPTsService.baocaoPHPTs_cbcss(utilsParams);
  }

  @Mutation((returns) => BaoCaoPHPT_CBCSType)
  @UseGuards(InsertGuard)
  createBaoCaoPHPT_CBCS(
    @CurrentUser() user: any,
    @Args('baocaoPHPT_cbcsInput')
    baocaoPHPT_cbcsInput: BaoCaoPHPT_CBCSInput,
  ): Promise<BaoCaoPHPT_CBCSType> {
    return this.baocaoPHPTsService.createBaoCaoPHPT_CBCS(
      baocaoPHPT_cbcsInput,
      user,
    );
  }

  @Mutation((returns) => BaoCaoPHPT_CBCSType)
  @UseGuards(UpdateGuard)
  editBaoCaoPHPT_CBCS(
    @CurrentUser() user: any,
    @Args('baocaoPHPT_cbcsInput')
    baocaoPHPT_cbcsInput: BaoCaoPHPT_CBCSInput,
    @Args('MaBCPHPT') MaBCPHPT: number,
    @Args('MaCBCS') MaCBCS: number,
  ): Promise<BaoCaoPHPT_CBCSType> {
    return this.baocaoPHPTsService.editBaoCaoPHPT_CBCS(
      baocaoPHPT_cbcsInput,
      MaBCPHPT,
      MaCBCS,
      user,
    );
  }

  @Mutation((retursn) => BaoCaoPHPT_CBCSType)
  @UseGuards(DeleteGuard)
  deleteBaoCaoPHPT_CBCS(
    @CurrentUser() user: any,
    @Args('MaBCPHPT') MaBCPHPT: number,
    @Args('MaCBCS') MaCBCS: number,
  ): Promise<BaoCaoPHPT_CBCSType> {
    return this.baocaoPHPTsService.deleteBaoCaoPHPT_CBCS(
      MaBCPHPT,
      MaCBCS,
      user,
    );
  }
  // ResolveField

  @ResolveField((returns) => KetQuaTSNT)
  KetQuaTSNT(@Parent() baocaoPHPT: BaoCaoPHPT): Promise<KetQuaTSNT> {
    return this.baocaoPHPTsService.KetQuaTSNT(baocaoPHPT);
  }

  @ResolveField((returns) => [CBCS])
  TSThucHiens(@Parent() baocaoPHPT: BaoCaoPHPT): Promise<CBCS[]> {
    return this.baocaoPHPTsService.TSThucHiens(baocaoPHPT.MaBCPHPT);
  }
}
