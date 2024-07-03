import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BienBanRKN } from './BienBanRKN.model';
import { BienBanRKNsService } from './BienBanRKNs.service';
import { BienBanRKNInput } from './type/BienBanRKN.Input';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { BienBanRKN_LanhDaoTGType } from './type/BienBanRKN_LanhDaoTG.type';
import { BienBanRKN_LanhDaoTGInput } from './type/BienBanRKN_LanhDaoTG.input';

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

  @Query((returns) => [BienBanRKN_LanhDaoTGType])
  bienBanRKNs_lanhDaoTGs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BienBanRKN_LanhDaoTGType[]> {
    return this.bienbanRKNsService.bienBanRKNs_lanhDaoTGs(utilsParams);
  }

  @Mutation((returns) => BienBanRKN_LanhDaoTGType)
  @UseGuards(InsertGuard)
  createBienBanRKN_LanhDaoTG(
    @CurrentUser() user: any,
    @Args('bienBanRKN_lanhDaoTGInput')
    bienBanRKN_lanhDaoTGInput: BienBanRKN_LanhDaoTGInput,
  ): Promise<BienBanRKN_LanhDaoTGType> {
    return this.bienbanRKNsService.createBienBanRKN_LanhDaoTG(
      bienBanRKN_lanhDaoTGInput,
      user,
    );
  }

  @Mutation((returns) => BienBanRKN_LanhDaoTGType)
  @UseGuards(UpdateGuard)
  editBienBanRKN_LanhDaoTG(
    @CurrentUser() user: any,
    @Args('bienBanRKN_lanhDaoTGInput')
    bienBanRKN_lanhDaoTGInput: BienBanRKN_LanhDaoTGInput,
    @Args('MaBBRKN') MaBBRKN: number,
    @Args('MaLanhDaoTG') MaLanhDaoTG: number,
  ): Promise<BienBanRKN_LanhDaoTGType> {
    return this.bienbanRKNsService.editBienBanRKN_LanhDaoTG(
      bienBanRKN_lanhDaoTGInput,
      MaBBRKN,
      MaLanhDaoTG,
      user,
    );
  }

  @Mutation((returns) => BienBanRKN_LanhDaoTGType)
  @UseGuards(DeleteGuard)
  deleteBienBanRKN_LanhDaoTG(
    @CurrentUser() user: any,
    @Args('MaBBRKN') MaBBRKN: number,
    @Args('MaLanhDaoTG') MaLanhDaoTG: number,
  ): Promise<BienBanRKN_LanhDaoTGType> {
    return this.bienbanRKNsService.deleteBienBanRKN_LanhDaoTG(
      MaBBRKN,
      MaLanhDaoTG,
      user,
    );
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
  LanhDaoTGs(@Parent() bienBanRKN: BienBanRKN): Promise<CBCS[]> {
    return this.bienbanRKNsService.LanhDaoTGs(bienBanRKN.MaBBRKN);
  }
}
