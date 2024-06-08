import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { KetQuaXMDiaChi } from './KetQuaXMDiaChi.model';
import { KetQuaXMDiaChisService } from './KetQuaXMDiaChis.service';
import { KetQuaXMDiaChiInput } from './type/KetQuaXMDiaChi.input';
import { DiaChiNV } from 'src/diachiNVs/DiaChiNV.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';

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
  @ResolveField((returns) => DiaChiNV)
  DiaChiNV(@Parent() ketquaXMDiaChi: KetQuaXMDiaChi): Promise<DiaChiNV> {
    return this.ketQuaXMDiaChisService.DiaChiNV(ketquaXMDiaChi);
  }

  @ResolveField((returns) => DeNghiTSNT)
  DeNghiTSNT(@Parent() ketquaXMDiaChi: KetQuaXMDiaChi): Promise<DeNghiTSNT> {
    return this.ketQuaXMDiaChisService.DeNghiTSNT(ketquaXMDiaChi);
  }

  @ResolveField((returns) => CATTPvaTD)
  CATTPvaTD(@Parent() ketquaXMDiaChi: KetQuaXMDiaChi): Promise<CATTPvaTD> {
    return this.ketQuaXMDiaChisService.CATTPvaTD(ketquaXMDiaChi);
  }

  @ResolveField((returns) => QuyetDinhTSNT)
  QuyetDinhTSNT(
    @Parent() ketquaXMDiaChi: KetQuaXMDiaChi,
  ): Promise<QuyetDinhTSNT> {
    return this.ketQuaXMDiaChisService.QuyetDinhTSNT(ketquaXMDiaChi);
  }

  @ResolveField((returns) => CAQHvaTD)
  CAQHvaTD(@Parent() ketquaXMDiaChi: KetQuaXMDiaChi): Promise<CAQHvaTD> {
    return this.ketQuaXMDiaChisService.CAQHvaTD(ketquaXMDiaChi);
  }

  @ResolveField((returns) => DoiTuong)
  DoiTuong(@Parent() ketquaXMDiaChi: KetQuaXMDiaChi): Promise<DoiTuong> {
    return this.ketQuaXMDiaChisService.DoiTuong(ketquaXMDiaChi);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() ketquaXMDiaChi: KetQuaXMDiaChi): Promise<CBCS> {
    return this.ketQuaXMDiaChisService.LanhDaoPD(ketquaXMDiaChi);
  }
}
