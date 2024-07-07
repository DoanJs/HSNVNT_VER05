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
import { KetQuaXMDiaChi } from './KetQuaXMDiaChi.model';
import { KetQuaXMDiaChisService } from './KetQuaXMDiaChis.service';
import { KetQuaXMDiaChiInput } from './type/KetQuaXMDiaChi.input';

@Resolver(() => KetQuaXMDiaChi)
@UseGuards(GraphQLGuard)
export class KetQuaXMDiaChisResolver {
  constructor(private ketQuaXMDiaChisService: KetQuaXMDiaChisService) {}

  @Query((returns) => [KetQuaXMDiaChi])
  ketQuaXMDiaChis(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<KetQuaXMDiaChi[]> {
    return this.ketQuaXMDiaChisService.ketQuaXMDiaChis(utilsParams);
  }

  @Query((returns) => KetQuaXMDiaChi)
  ketQuaXMDiaChi(@Args('id') id: number): Promise<KetQuaXMDiaChi> {
    return this.ketQuaXMDiaChisService.ketQuaXMDiaChi(id);
  }

  @Mutation((returns) => KetQuaXMDiaChi)
  @UseGuards(InsertGuard)
  createKetQuaXMDiaChi(
    @CurrentUser() user: any,
    @Args('ketQuaXMDiaChiInput') ketQuaXMDiaChiInput: KetQuaXMDiaChiInput,
  ): Promise<KetQuaXMDiaChi> {
    return this.ketQuaXMDiaChisService.createKetQuaXMDiaChi(
      ketQuaXMDiaChiInput,
      user,
    );
  }

  @Mutation((returns) => KetQuaXMDiaChi)
  @UseGuards(UpdateGuard)
  editKetQuaXMDiaChi(
    @CurrentUser() user: any,
    @Args('ketQuaXMDiaChiInput') ketQuaXMDiaChiInput: KetQuaXMDiaChiInput,
    @Args('id') id: number,
  ): Promise<KetQuaXMDiaChi> {
    return this.ketQuaXMDiaChisService.editKetQuaXMDiaChi(
      ketQuaXMDiaChiInput,
      id,
      user,
    );
  }

  @Mutation((returns) => KetQuaXMDiaChi)
  @UseGuards(DeleteGuard)
  deleteKetQuaXMDiaChi(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<KetQuaXMDiaChi> {
    return this.ketQuaXMDiaChisService.deleteKetQuaXMDiaChi(id, user);
  }

  //ResolveField
  @ResolveField((returns) => BaoCaoPHDC)
  BaoCaoPHDC(@Parent() ketquaXMDiaChi: KetQuaXMDiaChi): Promise<BaoCaoPHDC> {
    return this.ketQuaXMDiaChisService.BaoCaoPHDC(ketquaXMDiaChi);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() ketquaXMDiaChi: KetQuaXMDiaChi): Promise<CBCS> {
    return this.ketQuaXMDiaChisService.LanhDaoPD(ketquaXMDiaChi);
  }
}
