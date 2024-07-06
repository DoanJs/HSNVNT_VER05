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
import { BaoCaoKQXMDiaChi } from 'src/baocaoKQXMDiaChis/BaoCaoKQXMDiaChi.model';
import { BaoCaoKQXMQuanHe } from 'src/baocaoKQXMQuanHes/BaoCaoKQXMQuanHe.model';
import { BaoCaoKTDN } from 'src/baocaoKTDNs/BaoCaoKTDN.model';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import BaoCaoPHPT from 'src/baocaoPHPTs/BaoCaoPHPT.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { BienBanRKN } from 'src/bienbanRKNs/BienBanRKN.model';
import { CapBac } from 'src/capbacs/CapBac.model';
import { ChucVu } from 'src/chucvus/ChucVu.model';
import { DanhGiaTSTH } from 'src/danhgiaTSTHs/DanhGiaTSTH.model';
import { DanToc } from 'src/dantocs/DanToc.model';
import { DauMoiPH_DN } from 'src/dauMoiPH_DNs/DauMoiPH_DN.model';
import { Doi } from 'src/dois/Doi.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { KetQuaXMQuanHe } from 'src/ketQuaXMQuanHes/KetQuaXMQuanHe.model';
import { KyDuyet_DN } from 'src/kyDuyet_DNs/KyDuyet_DN.model';
import { LLDB } from 'src/lldbs/LLDB.model';
import { LucLuongThamGiaKH } from 'src/lltgKeHoachs/LucLuongThamGiaKH.model';
import { TonGiao } from 'src/tongiaos/TonGiao.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { CBCS } from './CBCS.model';
import { CBCSsService } from './CBCSs.service';
import { CBCSInput } from './type/CBCS.Input';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { KetQuaXMDiaChi } from 'src/ketQuaXMDiaChis/KetQuaXMDiaChi.model';

@Resolver(() => CBCS)
@UseGuards(GraphQLGuard)
export class CBCSsResolver {
  constructor(private cbcssService: CBCSsService) {}

  @Query((returns) => [CBCS])
  cbcss(@Args('utilsParams') utilsParams: UtilsParamsInput): Promise<CBCS[]> {
    return this.cbcssService.cbcss(utilsParams);
  }

  @Query((returns) => CBCS)
  cbcs(@Args('id') id: number): Promise<CBCS> {
    return this.cbcssService.cbcs(id);
  }

  @Mutation((returns) => CBCS)
  @UseGuards(InsertGuard)
  createCBCS(
    @CurrentUser() user: any,
    @Args('cbcsInput') cbcsInput: CBCSInput,
  ): Promise<CBCS> {
    return this.cbcssService.createCBCS(cbcsInput, user);
  }

  @Mutation((returns) => CBCS)
  @UseGuards(UpdateGuard)
  editCBCS(
    @CurrentUser() user: any,
    @Args('cbcsInput') cbcsInput: CBCSInput,
    @Args('id') id: number,
  ): Promise<CBCS> {
    return this.cbcssService.editCBCS(cbcsInput, id, user);
  }

  @Mutation((retursn) => CBCS)
  @UseGuards(DeleteGuard)
  deleteCBCS(
    @CurrentUser() user: any,
    @Args('cbcsInput') cbcsInput: CBCSInput,
    @Args('id') id: number,
  ): Promise<CBCS> {
    return this.cbcssService.deleteCBCS(cbcsInput, id, user);
  }

  // ResolveField
  @ResolveField((returns) => DanToc)
  DanToc(@Parent() cbcs: CBCS): Promise<DanToc> {
    return this.cbcssService.DanToc(cbcs);
  }

  @ResolveField((returns) => TonGiao)
  TonGiao(@Parent() cbcs: CBCS): Promise<TonGiao> {
    return this.cbcssService.TonGiao(cbcs);
  }

  @ResolveField((returns) => Doi)
  Doi(@Parent() cbcs: CBCS): Promise<Doi> {
    return this.cbcssService.Doi(cbcs);
  }

  @ResolveField((returns) => CapBac)
  CapBac(@Parent() cbcs: CBCS): Promise<CapBac> {
    return this.cbcssService.CapBac(cbcs);
  }

  @ResolveField((returns) => ChucVu)
  ChucVu(@Parent() cbcs: CBCS): Promise<ChucVu> {
    return this.cbcssService.ChucVu(cbcs);
  }

  @ResolveField((returns) => [KetQuaXMDiaChi])
  LanhDaoPD_KetQuaXMDiaChis(@Parent() cbcs: CBCS): Promise<KetQuaXMDiaChi[]> {
    return this.cbcssService.LanhDaoPD_KetQuaXMDiaChis(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoKQXMDiaChi])
  TSXacMinh_BaoCaoKQXMDiaChis(
    @Parent() cbcs: CBCS,
  ): Promise<BaoCaoKQXMDiaChi[]> {
    return this.cbcssService.TSXacMinh_BaoCaoKQXMDiaChis(cbcs.MaCBCS);
  }
  @ResolveField((returns) => [BaoCaoKQXMDiaChi])
  LanhDaoPD_BaoCaoKQXMDiaChis(
    @Parent() cbcs: CBCS,
  ): Promise<BaoCaoKQXMDiaChi[]> {
    return this.cbcssService.LanhDaoPD_BaoCaoKQXMDiaChis(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoKQXMDiaChi])
  BCHPhuTrach_BaoCaoKQXMDiaChis(
    @Parent() cbcs: CBCS,
  ): Promise<BaoCaoKQXMDiaChi[]> {
    return this.cbcssService.BCHPhuTrach_BaoCaoKQXMDiaChis(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoPHDC])
  TSThucHien_BaoCaoPHDCs(@Parent() cbcs: CBCS): Promise<BaoCaoPHDC[]> {
    return this.cbcssService.TSThucHien_BaoCaoPHDCs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoKQGH])
  LanhDaoPD_BaoCaoKQGHs(@Parent() cbcs: CBCS): Promise<BaoCaoKQGH[]> {
    return this.cbcssService.LanhDaoPD_BaoCaoKQGHs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoKQGH])
  TSThucHien_BaoCaoKQGHs(@Parent() cbcs: CBCS): Promise<BaoCaoKQGH[]> {
    return this.cbcssService.TSThucHien_BaoCaoKQGHs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BienBanRKN])
  ThanhPhanTD_BienBanRKNs(@Parent() cbcs: CBCS): Promise<BienBanRKN[]> {
    return this.cbcssService.ThanhPhanTD_BienBanRKNs(cbcs.MaCBCS);
  }
  
  @ResolveField((returns) => [BienBanRKN])
  ThuKy_BienBanRKNs(@Parent() cbcs: CBCS): Promise<BienBanRKN[]> {
    return this.cbcssService.ThuKy_BienBanRKNs(cbcs.MaCBCS);
  }
  
  @ResolveField((returns) => [BienBanRKN])
  ChuToa_BienBanRKNs(@Parent() cbcs: CBCS): Promise<BienBanRKN[]> {
    return this.cbcssService.ChuToa_BienBanRKNs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoPHQH])
  TSThucHien_BaoCaoPHQHs(@Parent() cbcs: CBCS): Promise<BaoCaoPHQH[]> {
    return this.cbcssService.TSThucHien_BaoCaoPHQHs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoPHQH])
  LanhDaoPD_BaoCaoPHQHs(@Parent() cbcs: CBCS): Promise<BaoCaoPHQH[]> {
    return this.cbcssService.LanhDaoPD_BaoCaoPHQHs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoPHQH])
  ToTruongTS_BaoCaoPHQHs(@Parent() cbcs: CBCS): Promise<BaoCaoPHQH[]> {
    return this.cbcssService.ToTruongTS_BaoCaoPHQHs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoPHPT])
  TSThucHien_BaoCaoPHPTs(@Parent() cbcs: CBCS): Promise<BaoCaoPHPT[]> {
    return this.cbcssService.TSThucHien_BaoCaoPHPTs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoKTDN])
  LanhDaoPD_BaoCaoKTDNs(@Parent() cbcs: CBCS): Promise<BaoCaoKTDN[]> {
    return this.cbcssService.LanhDaoPD_BaoCaoKTDNs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoKTDN])
  CBTongHop_BaoCaoKTDNs(@Parent() cbcs: CBCS): Promise<BaoCaoKTDN[]> {
    return this.cbcssService.CBTongHop_BaoCaoKTDNs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoKQXMQuanHe])
  LanhDaoPD_BaoCaoKQXMQuanHes(
    @Parent() cbcs: CBCS,
  ): Promise<BaoCaoKQXMQuanHe[]> {
    return this.cbcssService.LanhDaoPD_BaoCaoKQXMQuanHes(cbcs.MaCBCS);
  }
  
  @ResolveField((returns) => [BaoCaoKQXMQuanHe])
  BCHPhuTrach_BaoCaoKQXMQuanHes(
    @Parent() cbcs: CBCS,
  ): Promise<BaoCaoKQXMQuanHe[]> {
    return this.cbcssService.BCHPhuTrach_BaoCaoKQXMQuanHes(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [BaoCaoKQXMQuanHe])
  TSXacMinh_BaoCaoKQXMQuanHes(
    @Parent() cbcs: CBCS,
  ): Promise<BaoCaoKQXMQuanHe[]> {
    return this.cbcssService.TSXacMinh_BaoCaoKQXMQuanHes(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [DauMoiPH_DN])
  LDDonViDN_DauMoiPHs(
    @Parent() cbcs: CBCS,
  ): Promise<DauMoiPH_DN[]> {
    return this.cbcssService.LDDonViDN_DauMoiPHs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [DauMoiPH_DN])
  CBTrucTiepPH_DauMoiPHs(
    @Parent() cbcs: CBCS,
  ): Promise<DauMoiPH_DN[]> {
    return this.cbcssService.CBTrucTiepPH_DauMoiPHs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [KyDuyet_DN])
  DaiDienCATTPvaTD_KyDuyet_DNs(
    @Parent() cbcs: CBCS,
  ): Promise<KyDuyet_DN[]> {
    return this.cbcssService.DaiDienCATTPvaTD_KyDuyet_DNs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [KyDuyet_DN])
  DaiDienDonViDN_KyDuyet_DNs(
    @Parent() cbcs: CBCS,
  ): Promise<KyDuyet_DN[]> {
    return this.cbcssService.DaiDienDonViDN_KyDuyet_DNs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [KyDuyet_DN])
  DaiDienDonViTSNT_KyDuyet_DNs(
    @Parent() cbcs: CBCS,
  ): Promise<KyDuyet_DN[]> {
    return this.cbcssService.DaiDienDonViTSNT_KyDuyet_DNs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [KeHoachTSNT])
  LanhDaoPD_KeHoachTSNTs(@Parent() cbcs: CBCS): Promise<KeHoachTSNT[]> {
    return this.cbcssService.LanhDaoPD_KeHoachTSNTs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [KeHoachTSNT])
  BCHPhuTrach_KeHoachTSNTs(@Parent() cbcs: CBCS): Promise<KeHoachTSNT[]> {
    return this.cbcssService.BCHPhuTrach_KeHoachTSNTs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [TramCT])
  TSXayDung_TramCTs(@Parent() cbcs: CBCS): Promise<TramCT[]> {
    return this.cbcssService.TSXayDung_TramCTs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [TramCT])
  LanhDaoPD_TramCTs(@Parent() cbcs: CBCS): Promise<TramCT[]> {
    return this.cbcssService.LanhDaoPD_TramCTs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [KetQuaXMQuanHe])
  LanhDaoPD_KetQuaXMQuanHes(@Parent() cbcs: CBCS): Promise<KetQuaXMQuanHe[]> {
    return this.cbcssService.LanhDaoPD_KetQuaXMQuanHes(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [LucLuongThamGiaKH])
  LucLuongThamGiaKHs(@Parent() cbcs: CBCS): Promise<LucLuongThamGiaKH[]> {
    return this.cbcssService.LucLuongThamGiaKHs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [DanhGiaTSTH])
  DanhGiaTSTHs(@Parent() cbcs: CBCS): Promise<DanhGiaTSTH[]> {
    return this.cbcssService.DanhGiaTSTHs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [LLDB])
  TSQuanLy_LLDBs(@Parent() cbcs: CBCS): Promise<LLDB[]> {
    return this.cbcssService.TSQuanLy_LLDBs(cbcs.MaCBCS);
  }

  @ResolveField((returns) => [QuyetDinhTSNT])
  LanhDaoPD_QuyetDinhTSNTs(@Parent() cbcs: CBCS): Promise<QuyetDinhTSNT[]> {
    return this.cbcssService.LanhDaoPD_QuyetDinhTSNTs(cbcs.MaCBCS);
  }
}
