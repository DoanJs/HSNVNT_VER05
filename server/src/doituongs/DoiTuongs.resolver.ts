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
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BienPhapDT } from 'src/bienPhapDTs/BienPhapDT.model';
import { DanToc } from 'src/dantocs/DanToc.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { DoiTuongCA } from 'src/doituongCAs/DoiTuongCA.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { LoaiDT } from 'src/loaiDTs/LoaiDT.model';
import { QuocTich } from 'src/quoctichs/QuocTich.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TinhChatDT } from 'src/tinhchatDTs/TinhChatDT.model';
import { TonGiao } from 'src/tongiaos/TonGiao.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { DoiTuong } from './DoiTuong.model';
import { DoiTuongsService } from './DoiTuongs.service';
import { BienPhapDT_DoiTuongInput } from './type/BienPhapDT_DoiTuong.input';
import { BienPhapDT_DoiTuongType } from './type/BienPhapDT_DoiTuong.type';
import { DoiTuongInput } from './type/DoiTuong.input';

@Resolver(() => DoiTuong)
@UseGuards(GraphQLGuard)
export class DoiTuongsResolver {
  constructor(private doituongsService: DoiTuongsService) {}

  @Query((returns) => [DoiTuong])
  doituongs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<DoiTuong[]> {
    return this.doituongsService.doituongs(utilsParams);
  }

  @Query((returns) => DoiTuong)
  doituong(@Args('id') id: number): Promise<DoiTuong> {
    return this.doituongsService.doituong(id);
  }

  @Mutation((returns) => DoiTuong)
  @UseGuards(InsertGuard)
  createDoiTuong(
    @CurrentUser() user: any,
    @Args('doituongInput') doituongInput: DoiTuongInput,
  ): Promise<DoiTuong> {
    return this.doituongsService.createDoiTuong(doituongInput, user);
  }

  @Mutation((returns) => DoiTuong)
  @UseGuards(UpdateGuard)
  editDoiTuong(
    @CurrentUser() user: any,
    @Args('doituongInput') doituongInput: DoiTuongInput,
    @Args('id') id: number,
  ): Promise<DoiTuong> {
    return this.doituongsService.editDoiTuong(doituongInput, id, user);
  }

  @Mutation((retursn) => DoiTuong)
  @UseGuards(DeleteGuard)
  deleteDoiTuong(
    @CurrentUser() user: any,
    @Args('doituongInput') doituongInput: DoiTuongInput,
    @Args('id') id: number,
  ): Promise<DoiTuong> {
    return this.doituongsService.deleteDoiTuong(doituongInput, id, user);
  }

  // many-to-many relation

  @Query((returns) => [BienPhapDT_DoiTuongType])
  bienphapDTs_doituongs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BienPhapDT_DoiTuongType[]> {
    return this.doituongsService.bienphapDTs_doituongs(utilsParams);
  }

  @Mutation((returns) => BienPhapDT_DoiTuongType)
  @UseGuards(InsertGuard)
  createBienPhapDT_DoiTuong(
    @CurrentUser() user: any,
    @Args('bienphapdt_doituongInput')
    bienphapdt_doituongInput: BienPhapDT_DoiTuongInput,
  ): Promise<BienPhapDT_DoiTuongType> {
    return this.doituongsService.createBienPhapDT_DoiTuong(
      bienphapdt_doituongInput,
      user,
    );
  }

  @Mutation((returns) => BienPhapDT_DoiTuongType)
  @UseGuards(UpdateGuard)
  editBienPhapDT_DoiTuong(
    @CurrentUser() user: any,
    @Args('bienphapdt_doituongInput')
    bienphapdt_doituongInput: BienPhapDT_DoiTuongInput,
    @Args('MaBPDT') MaBPDT: number,
    @Args('MaDoiTuong') MaDoiTuong: number,
  ): Promise<BienPhapDT_DoiTuongType> {
    return this.doituongsService.editBienPhapDT_DoiTuong(
      bienphapdt_doituongInput,
      MaBPDT,
      MaDoiTuong,
      user,
    );
  }

  @Mutation((retursn) => BienPhapDT_DoiTuongType)
  @UseGuards(DeleteGuard)
  deleteBienPhapDT_DoiTuong(
    @CurrentUser() user: any,
    @Args('MaBPDT') MaBPDT: number,
    @Args('MaDoiTuong') MaDoiTuong: number,
  ): Promise<BienPhapDT_DoiTuongType> {
    return this.doituongsService.deleteBienPhapDT_DoiTuong(
      MaBPDT,
      MaDoiTuong,
      user,
    );
  }

  // ResolveField

  @ResolveField((returns) => [BienPhapDT])
  BienPhapDTs(@Parent() doituong: DoiTuong): Promise<BienPhapDT[]> {
    return this.doituongsService.BienPhapDTs(doituong.MaDoiTuong);
  }

  @ResolveField((returns) => QuocTich)
  QuocTich(@Parent() doituong: DoiTuong): Promise<QuocTich> {
    return this.doituongsService.QuocTich(doituong);
  }

  @ResolveField((returns) => DanToc)
  DanToc(@Parent() doituong: DoiTuong): Promise<DanToc> {
    return this.doituongsService.DanToc(doituong);
  }

  @ResolveField((returns) => TonGiao)
  TonGiao(@Parent() doituong: DoiTuong): Promise<TonGiao> {
    return this.doituongsService.TonGiao(doituong);
  }

  @ResolveField((returns) => TinhChatDT)
  TinhChatDT(@Parent() doituong: DoiTuong): Promise<TinhChatDT> {
    return this.doituongsService.TinhChatDT(doituong);
  }

  @ResolveField((returns) => LoaiDT)
  LoaiDT(@Parent() doituong: DoiTuong): Promise<LoaiDT> {
    return this.doituongsService.LoaiDT(doituong);
  }

  @ResolveField((returns) => [DoiTuongCA])
  DoiTuongCAs(@Parent() doituong: DoiTuong): Promise<DoiTuongCA[]> {
    return this.doituongsService.DoiTuongCAs(doituong.MaDoiTuong);
  }

  @ResolveField((returns) => [QuyetDinhTSNT])
  QuyetDinhTSNTs(@Parent() doituong: DoiTuong): Promise<QuyetDinhTSNT[]> {
    return this.doituongsService.QuyetDinhTSNTs(doituong.MaDoiTuong);
  }

  @ResolveField((returns) => [DeNghiTSNT])
  DeNghiTSNTs(@Parent() doituong: DoiTuong): Promise<DeNghiTSNT[]> {
    return this.doituongsService.DeNghiTSNTs(doituong.MaDoiTuong);
  }

  @ResolveField((returns) => [KeHoachTSNT])
  KeHoachTSNTs(@Parent() doituong: DoiTuong): Promise<KeHoachTSNT[]> {
    return this.doituongsService.KeHoachTSNTs(doituong.MaDoiTuong);
  }

  @ResolveField((returns) => [BaoCaoKQGH])
  BaoCaoKQGHs(@Parent() doituong: DoiTuong): Promise<BaoCaoKQGH[]> {
    return this.doituongsService.BaoCaoKQGHs(doituong.MaDoiTuong);
  }

  @ResolveField((returns) => TramCT)
  TramCT(@Parent() doituong: DoiTuong): Promise<TramCT> {
    return this.doituongsService.TramCT(doituong);
  }
}
