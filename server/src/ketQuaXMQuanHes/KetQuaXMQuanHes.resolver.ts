import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { KetQuaXMQuanHe } from './KetQuaXMQuanHe.model';
import { KetQuaXMQuanHesService } from './KetQuaXMQuanHes.service';
import { KetQuaXMQuanHeInput } from './type/KetQuaXMQuanHe.input';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';

@Resolver(() => KetQuaXMQuanHe)
@UseGuards(GraphQLGuard)
export class KetQuaXMQuanHesResolver {
  constructor(private ketQuaXMQuanHesService: KetQuaXMQuanHesService) {}

  @Query((returns) => [KetQuaXMQuanHe])
  ketQuaXMQuanHes(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<KetQuaXMQuanHe[]> {
    return this.ketQuaXMQuanHesService.ketQuaXMQuanHes(utilsParams);
  }

  @Query((returns) => KetQuaXMQuanHe)
  ketQuaXMQuanHe(@Args('id') id: number): Promise<KetQuaXMQuanHe> {
    return this.ketQuaXMQuanHesService.ketQuaXMQuanHe(id);
  }

  @Mutation((returns) => KetQuaXMQuanHe)
  @UseGuards(InsertGuard)
  createKetQuaXMQuanHe(
    @Args('ketQuaXMQuanHeInput') ketQuaXMQuanHeInput: KetQuaXMQuanHeInput,
  ): Promise<KetQuaXMQuanHe> {
    return this.ketQuaXMQuanHesService.createKetQuaXMQuanHe(
      ketQuaXMQuanHeInput,
    );
  }

  @Mutation((returns) => KetQuaXMQuanHe)
  @UseGuards(UpdateGuard)
  editKetQuaXMQuanHe(
    @Args('ketQuaXMQuanHeInput') ketQuaXMQuanHeInput: KetQuaXMQuanHeInput,
    @Args('id') id: number,
  ): Promise<KetQuaXMQuanHe> {
    return this.ketQuaXMQuanHesService.editKetQuaXMQuanHe(
      ketQuaXMQuanHeInput,
      id,
    );
  }

  @Mutation((returns) => KetQuaXMQuanHe)
  @UseGuards(DeleteGuard)
  deleteKetQuaXMQuanHe(@Args('id') id: number): Promise<KetQuaXMQuanHe> {
    return this.ketQuaXMQuanHesService.deleteKetQuaXMQuanHe(id);
  }

  //ResolveField

  @ResolveField((returns) => BaoCaoPHQH)
  BaoCaoPHQH(@Parent() ketquaXMDiaChi: BaoCaoPHQH): Promise<BaoCaoPHQH> {
    return this.ketQuaXMQuanHesService.BaoCaoPHQH(ketquaXMDiaChi);
  }

  @ResolveField((returns) => DeNghiTSNT)
  DeNghiTSNT(@Parent() ketquaXMDiaChi: DeNghiTSNT): Promise<DeNghiTSNT> {
    return this.ketQuaXMQuanHesService.DeNghiTSNT(ketquaXMDiaChi);
  }

  @ResolveField((returns) => QuyetDinhTSNT)
  QuyetDinhTSNT(
    @Parent() ketquaXMDiaChi: QuyetDinhTSNT,
  ): Promise<QuyetDinhTSNT> {
    return this.ketQuaXMQuanHesService.QuyetDinhTSNT(ketquaXMDiaChi);
  }

  @ResolveField((returns) => CATTPvaTD)
  CATTPvaTD(@Parent() ketquaXMDiaChi: CATTPvaTD): Promise<CATTPvaTD> {
    return this.ketQuaXMQuanHesService.CATTPvaTD(ketquaXMDiaChi);
  }

  @ResolveField((returns) => CAQHvaTD)
  CAQHvaTD(@Parent() ketquaXMDiaChi: CAQHvaTD): Promise<CAQHvaTD> {
    return this.ketQuaXMQuanHesService.CAQHvaTD(ketquaXMDiaChi);
  }

  @ResolveField((returns) => DoiTuong)
  DoiTuong(@Parent() ketquaXMDiaChi: DoiTuong): Promise<DoiTuong> {
    return this.ketQuaXMQuanHesService.DoiTuong(ketquaXMDiaChi);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() ketquaXMDiaChi: CBCS): Promise<CBCS> {
    return this.ketQuaXMQuanHesService.LanhDaoPD(ketquaXMDiaChi);
  }
}
