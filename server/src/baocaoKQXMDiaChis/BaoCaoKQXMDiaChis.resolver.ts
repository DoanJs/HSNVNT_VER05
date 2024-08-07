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
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BaoCaoKQXMDiaChi } from './BaoCaoKQXMDiaChi.model';
import BaoCaoKQXMDiaChisService from './BaoCaoKQXMDiaChis.service';
import { BaoCaoKQXMDiaChiInput } from './type/BaoCaoKQXMDiaChi.input';

@Resolver(() => BaoCaoKQXMDiaChi)
@UseGuards(GraphQLGuard)
export class BaoCaoKQXMDiaChisResolver {
  constructor(private baocaoKQXMDiaChisService: BaoCaoKQXMDiaChisService) {}
  @Query((returns) => [BaoCaoKQXMDiaChi])
  baocaoKQXMDiaChis(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoKQXMDiaChi[]> {
    return this.baocaoKQXMDiaChisService.baocaoKQXMDiaChis(utilsParams);
  }

  @Query((returns) => BaoCaoKQXMDiaChi)
  baocaoKQXMDiaChi(@Args('id') id: number): Promise<BaoCaoKQXMDiaChi> {
    return this.baocaoKQXMDiaChisService.baocaoKQXMDiaChi(id);
  }

  @Mutation((returns) => BaoCaoKQXMDiaChi)
  @UseGuards(InsertGuard)
  createBaoCaoKQXMDiaChi(
    @CurrentUser() user: any,
    @Args('baocaoKQXMDiaChiInput') baocaoKQXMDiaChiInput: BaoCaoKQXMDiaChiInput,
  ): Promise<BaoCaoKQXMDiaChi> {
    return this.baocaoKQXMDiaChisService.createBaoCaoKQXMDiaChi(
      baocaoKQXMDiaChiInput,
      user,
    );
  }

  @Mutation((returns) => BaoCaoKQXMDiaChi)
  @UseGuards(UpdateGuard)
  editBaoCaoKQXMDiaChi(
    @CurrentUser() user: any,
    @Args('baocaoKQXMDiaChiInput') baocaoKQXMDiaChiInput: BaoCaoKQXMDiaChiInput,
    @Args('id') id: number,
  ): Promise<BaoCaoKQXMDiaChi> {
    return this.baocaoKQXMDiaChisService.editBaoCaoKQXMDiaChi(
      baocaoKQXMDiaChiInput,
      id,
      user,
    );
  }

  @Mutation((retursn) => BaoCaoKQXMDiaChi)
  @UseGuards(DeleteGuard)
  deleteBaoCaoKQXMDiaChi(
    @CurrentUser() user: any,
    @Args('baocaoKQXMDiaChiInput') baocaoKQXMDiaChiInput: BaoCaoKQXMDiaChiInput,
    @Args('id') id: number,
  ): Promise<BaoCaoKQXMDiaChi> {
    return this.baocaoKQXMDiaChisService.deleteBaoCaoKQXMDiaChi(
      baocaoKQXMDiaChiInput,
      id,
      user,
    );
  }

  // ResolveField----------------------

  @ResolveField((returns) => BaoCaoPHDC)
  BaoCaoPHDC(
    @Parent() baocaoKQXMDiaChi: BaoCaoKQXMDiaChi,
  ): Promise<BaoCaoPHDC> {
    return this.baocaoKQXMDiaChisService.BaoCaoPHDC(baocaoKQXMDiaChi);
  }

  @ResolveField((returns) => CBCS)
  TSXacMinh(@Parent() baocaoKQXMDiaChi: BaoCaoKQXMDiaChi): Promise<CBCS> {
    return this.baocaoKQXMDiaChisService.TSXacMinh(baocaoKQXMDiaChi);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() baocaoKQXMDiaChi: BaoCaoKQXMDiaChi): Promise<CBCS> {
    return this.baocaoKQXMDiaChisService.LanhDaoPD(baocaoKQXMDiaChi);
  }

  @ResolveField((returns) => CBCS)
  BanChiHuy(@Parent() baocaoKQXMDiaChi: BaoCaoKQXMDiaChi): Promise<CBCS> {
    return this.baocaoKQXMDiaChisService.BanChiHuy(baocaoKQXMDiaChi);
  }
}
