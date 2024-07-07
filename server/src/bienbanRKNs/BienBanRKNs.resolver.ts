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
import { BienBanRKN } from './BienBanRKN.model';
import { BienBanRKNsService } from './BienBanRKNs.service';
import { BienBanRKNInput } from './type/BienBanRKN.Input';
import { BienBanRKN_CBCSInput } from './type/BienBanRKN_CBCS.input';
import { BienBanRKN_CBCSType } from './type/BienBanRKN_CBCS.type';

@Resolver(() => BienBanRKN)
@UseGuards(GraphQLGuard)
export class BienBanRKNsResolver {
  constructor(private bienbanRKNsService: BienBanRKNsService) {}

  @Query((returns) => [BienBanRKN])
  bienBanRKNs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BienBanRKN[]> {
    return this.bienbanRKNsService.bienBanRKNs(utilsParams);
  }

  @Query((returns) => BienBanRKN)
  bienBanRKN(@Args('id') id: number): Promise<BienBanRKN> {
    return this.bienbanRKNsService.bienBanRKN(id);
  }

  @Mutation((returns) => BienBanRKN)
  @UseGuards(InsertGuard)
  createBienBanRKN(
    @CurrentUser() user: any,
    @Args('bienbanRKNInput') bienbanRKNInput: BienBanRKNInput,
  ): Promise<BienBanRKN> {
    return this.bienbanRKNsService.createBienBanRKN(bienbanRKNInput, user);
  }

  @Mutation((returns) => BienBanRKN)
  @UseGuards(UpdateGuard)
  editBienBanRKN(
    @CurrentUser() user: any,
    @Args('bienbanRKNInput') bienbanRKNInput: BienBanRKNInput,
    @Args('id') id: number,
  ): Promise<BienBanRKN> {
    return this.bienbanRKNsService.editBienBanRKN(bienbanRKNInput, id, user);
  }

  @Mutation((returns) => BienBanRKN)
  @UseGuards(DeleteGuard)
  deleteBienBanRKN(
    @CurrentUser() user: any,
    @Args('bienbanRKNInput') bienbanRKNInput: BienBanRKNInput,
    @Args('id') id: number,
  ): Promise<BienBanRKN> {
    return this.bienbanRKNsService.deleteBienBanRKN(bienbanRKNInput, id, user);
  }

  // many-to-many

  @Query((returns) => [BienBanRKN_CBCSType])
  bienBanRKNs_cbcss(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BienBanRKN_CBCSType[]> {
    return this.bienbanRKNsService.bienBanRKNs_cbcss(utilsParams);
  }

  @Mutation((returns) => BienBanRKN_CBCSType)
  @UseGuards(InsertGuard)
  createBienBanRKN_CBCS(
    @CurrentUser() user: any,
    @Args('bienBanRKN_CBCSInput')
    bienBanRKN_CBCSInput: BienBanRKN_CBCSInput,
  ): Promise<BienBanRKN_CBCSType> {
    return this.bienbanRKNsService.createBienBanRKN_CBCS(
      bienBanRKN_CBCSInput,
      user,
    );
  }

  @Mutation((returns) => BienBanRKN_CBCSType)
  @UseGuards(UpdateGuard)
  editBienBanRKN_CBCS(
    @CurrentUser() user: any,
    @Args('bienBanRKN_CBCSInput')
    bienBanRKN_CBCSInput: BienBanRKN_CBCSInput,
    @Args('MaBBRKN') MaBBRKN: number,
    @Args('MaCBCS') MaCBCS: number,
  ): Promise<BienBanRKN_CBCSType> {
    return this.bienbanRKNsService.editBienBanRKN_CBCS(
      bienBanRKN_CBCSInput,
      MaBBRKN,
      MaCBCS,
      user,
    );
  }

  @Mutation((returns) => BienBanRKN_CBCSType)
  @UseGuards(DeleteGuard)
  deleteBienBanRKN_CBCS(
    @CurrentUser() user: any,
    @Args('MaBBRKN') MaBBRKN: number,
    @Args('MaCBCS') MaCBCS: number,
  ): Promise<BienBanRKN_CBCSType> {
    return this.bienbanRKNsService.deleteBienBanRKN_CBCS(MaBBRKN, MaCBCS, user);
  }

  //ResolveField
  @ResolveField((returns) => KetQuaTSNT)
  KetQuaTSNT(@Parent() bienBanRKN: BienBanRKN): Promise<KetQuaTSNT> {
    return this.bienbanRKNsService.KetQuaTSNT(bienBanRKN);
  }

  @ResolveField((returns) => CBCS)
  ChuToa(@Parent() bienBanRKN: BienBanRKN): Promise<CBCS> {
    return this.bienbanRKNsService.ChuToa(bienBanRKN);
  }

  @ResolveField((returns) => CBCS)
  ThuKy(@Parent() bienBanRKN: BienBanRKN): Promise<CBCS> {
    return this.bienbanRKNsService.ThuKy(bienBanRKN);
  }

  @ResolveField((returns) => [CBCS])
  ThanhPhanTDs(@Parent() bienBanRKN: BienBanRKN): Promise<CBCS[]> {
    return this.bienbanRKNsService.ThanhPhanTDs(bienBanRKN.MaBBRKN);
  }
}
