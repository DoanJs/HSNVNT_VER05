import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BaoCaoKQXMDiaChi } from 'src/baocaoKQXMDiaChis/BaoCaoKQXMDiaChi.model';
import { BaoCaoKQXMQuanHe } from 'src/baocaoKQXMQuanHes/BaoCaoKQXMQuanHe.model';
import { BaoCaoKTDN } from 'src/baocaoKTDNs/BaoCaoKTDN.model';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import { BaoCaoPHPT } from 'src/baocaoPHPTs/BaoCaoPHPT.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { BienBanRKN } from 'src/bienbanRKNs/BienBanRKN.model';
import { CapBac } from 'src/capbacs/CapBac.model';
import { ChucVu } from 'src/chucvus/ChucVu.model';
import { DanhGiaTSTH } from 'src/danhgiaTSTHs/DanhGiaTSTH.model';
import { DanToc } from 'src/dantocs/DanToc.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { DauMoiPH_DN } from 'src/dauMoiPH_DNs/DauMoiPH_DN.model';
import { Doi } from 'src/dois/Doi.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { KetQuaXMDiaChi } from 'src/ketQuaXMDiaChis/KetQuaXMDiaChi.model';
import { KetQuaXMQuanHe } from 'src/ketQuaXMQuanHes/KetQuaXMQuanHe.model';
import { KyDuyet_DN } from 'src/kyDuyet_DNs/KyDuyet_DN.model';
import { LLDB } from 'src/lldbs/LLDB.model';
import { LucLuongThamGiaKH } from 'src/lltgKeHoachs/LucLuongThamGiaKH.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { SQLServerAuthService } from 'src/sqlserever/sqlserver.auth.service';
import { ThanhVienBCA } from 'src/thanhvienBCAs/ThanhVienBCA.model';
import { TonGiao } from 'src/tongiaos/TonGiao.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import {
  SP_CHANGE_CBCS,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { CBCS } from './CBCS.model';
import { CBCSInput } from './type/CBCS.Input';

@Injectable()
export class CBCSsService {
  constructor(
    @InjectRepository(CBCS) private cbcsRepository: Repository<CBCS>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
    private readonly sqlServerAuthService: SQLServerAuthService,
  ) {}

  public readonly CBCS_DataInput = (
    Type: string,
    MaCBCS: number | null,
    cbcsInput: CBCSInput,
  ) => {
    return {
      Type,
      MaCBCS,
      CBCSInput: {
        HoTen: `N'${cbcsInput.HoTen}'`, //crypto
        TenKhac: cbcsInput.TenKhac ? `N'${cbcsInput.TenKhac}'` : null,
        NgaySinh: cbcsInput.NgaySinh ? `N'${cbcsInput.NgaySinh}'` : null,
        QueQuan: cbcsInput.QueQuan ? `N'${cbcsInput.QueQuan}'` : null,
        HKTT: cbcsInput.HKTT ? `N'${cbcsInput.HKTT}'` : null,
        PhuongTien: cbcsInput.PhuongTien ? `N'${cbcsInput.PhuongTien}'` : null,
        ThongTinChiTiet: cbcsInput.ThongTinChiTiet
          ? `N'${cbcsInput.ThongTinChiTiet}'`
          : null,
        GioiTinh: cbcsInput.GioiTinh ? cbcsInput.GioiTinh : null,
        NoiO: `N'${cbcsInput.NoiO}'`, //crypto
        AnhDD: `N'${cbcsInput.AnhDD}'`, //crypto
        SDT: `N'${cbcsInput.SDT}'`, //crypto
        CMCCHC: `N'${cbcsInput.CMCCHC}'`, //crypto
        MaDT: cbcsInput.MaDT ? cbcsInput.MaDT : null,
        MaTG: cbcsInput.MaTG ? cbcsInput.MaTG : null,
        MaCB: cbcsInput.MaCB ? cbcsInput.MaCB : null,
        MaCV: cbcsInput.MaCV ? cbcsInput.MaCV : null,
        MaDoi: cbcsInput.MaDoi ? cbcsInput.MaDoi : null,
      },
    };
  };

  async cbcss(utilsParams: UtilsParamsInput, user: any): Promise<CBCS[]> {
    const dataSource = await this.sqlServerAuthService.SQLServerAuth(
      user.Username,
      user.Username,
    );

    return await dataSource.query(
      SP_GET_DATA_DECRYPT(
        'CBCSs',
        `'MaCBCS != 0'`,
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async cbcs(id: number, user: any): Promise<CBCS> {
    console.log(user)
    const dataSource = await this.sqlServerAuthService.SQLServerAuth(
      user.Username,
      user.Username,
    );
    const result = await dataSource.query(
      SP_GET_DATA_DECRYPT('CBCSs', `'MaCBCS = ${id}'`, 0, 1),
    );
    return result[0];
  }

  async createCBCS(cbcsInput: CBCSInput, user: any): Promise<CBCS> {
    const result = await this.cbcsRepository.query(
      SP_CHANGE_CBCS(this.CBCS_DataInput('CREATE', null, cbcsInput)),
    );

    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaCBCS: ${result[0].MaCBCS};`,
      TableName: 'CBCSs',
    });
    return result[0];
  }

  async editCBCS(cbcsInput: CBCSInput, id: number, user: any): Promise<CBCS> {
    const result = await this.cbcsRepository.query(
      SP_CHANGE_CBCS(this.CBCS_DataInput('EDIT', id, cbcsInput)),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaCBCS: ${result[0].MaCBCS};`,
      TableName: 'CBCSs',
    });
    return result[0];
  }

  async deleteCBCS(cbcsInput: CBCSInput, id: number, user: any): Promise<CBCS> {
    const result = await this.cbcsRepository.query(
      SP_CHANGE_CBCS(this.CBCS_DataInput('DELETE', id, cbcsInput)),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaCBCS: ${result[0].MaCBCS};`,
      TableName: 'CBCSs',
    });
    return result[0];
  }

  //ResolveField

  async DanToc(cbcs: any): Promise<DanToc> {
    if (cbcs.MaDT) {
      return this.dataloaderService.loaderDanToc.load(cbcs.MaDT);
    }
  }
  async TonGiao(cbcs: any): Promise<TonGiao> {
    if (cbcs.MaTG) {
      return this.dataloaderService.loaderTonGiao.load(cbcs.MaTG);
    }
  }
  async Doi(cbcs: any): Promise<Doi> {
    if (cbcs.MaDoi) {
      return this.dataloaderService.loaderDoi.load(cbcs.MaDoi);
    }
  }
  async CapBac(cbcs: any): Promise<CapBac> {
    if (cbcs.MaCB) {
      return this.dataloaderService.loaderCapBac.load(cbcs.MaCB);
    }
  }
  async ChucVu(cbcs: any): Promise<ChucVu> {
    if (cbcs.MaCV) {
      return this.dataloaderService.loaderChucVu.load(cbcs.MaCV);
    }
  }
  async LanhDaoPD_KetQuaXMDiaChis(MaCBCS: number): Promise<KetQuaXMDiaChi[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA(
        'KetQuaXMDiaChis',
        `'MaLanhDaoPD = ${MaCBCS}'`,
        'MaKQXMDC',
        0,
        0,
      ),
    );
  }
  async TSXacMinh_BaoCaoKQXMDiaChis(
    MaCBCS: number,
  ): Promise<BaoCaoKQXMDiaChi[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKQXMDiaChis',
        `'MaTSXacMinh = ${MaCBCS}'`,
        0,
        0,
      ),
    );
  }
  async LanhDaoPD_BaoCaoKQXMDiaChis(
    MaCBCS: number,
  ): Promise<BaoCaoKQXMDiaChi[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKQXMDiaChis',
        `'MaLanhDaoPD = ${MaCBCS}'`,
        0,
        0,
      ),
    );
  }
  async BCHPhuTrach_BaoCaoKQXMDiaChis(
    MaCBCS: number,
  ): Promise<BaoCaoKQXMDiaChi[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKQXMDiaChis',
        `'MaBCHPhuTrach = ${MaCBCS}'`,
        0,
        0,
      ),
    );
  }
  async TSThucHien_BaoCaoPHDCs(MaCBCS: number): Promise<BaoCaoPHDC[]> {
    const result = (await this.cbcsRepository.query(
      SP_GET_DATA(
        'BaoCaoPHDCs_CBCSs',
        `'MaCBCS = ${MaCBCS}'`,
        'MaBCPHDC',
        0,
        0,
      ),
    )) as [{ MaBCPHDC: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderBaoCaoPHDC.load(obj.MaBCPHDC),
    );
    return await Promise.all(resultLoader);
  }
  async LanhDaoPD_BaoCaoKQGHs(MaCBCS: number): Promise<BaoCaoKQGH[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKQGHs', `'MaLanhDaoPD = ${MaCBCS}'`, 0, 0),
    );
  }
  async TSThucHien_BaoCaoKQGHs(MaCBCS: number): Promise<BaoCaoKQGH[]> {
    const result = (await this.cbcsRepository.query(
      SP_GET_DATA(
        'BaoCaoKQGHs_CBCSs',
        `'MaCBCS = ${MaCBCS}'`,
        'MaBCKQGH',
        0,
        0,
      ),
    )) as [{ MaBCKQGH: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderBaoCaoKQGH.load(obj.MaBCKQGH),
    );
    return await Promise.all(resultLoader);
  }
  async ThanhPhanTD_BienBanRKNs(MaCBCS: number): Promise<BienBanRKN[]> {
    const result = (await this.cbcsRepository.query(
      SP_GET_DATA('BienBanRKNs_CBCSs', `'MaCBCS = ${MaCBCS}'`, 'MaBBRKN', 0, 0),
    )) as [{ MaBBRKN: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderBienBanRKN.load(obj.MaBBRKN),
    );
    return await Promise.all(resultLoader);
  }
  async ThuKy_BienBanRKNs(MaCBCS: number): Promise<BienBanRKN[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('BienBanRKNs', `'MaThuKy = ${MaCBCS}'`, 0, 0),
    );
  }
  async ChuToa_BienBanRKNs(MaCBCS: number): Promise<BienBanRKN[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('BienBanRKNs', `'MaChuToa = ${MaCBCS}'`, 0, 0),
    );
  }
  async TSThucHien_BaoCaoPHQHs(MaCBCS: number): Promise<BaoCaoPHQH[]> {
    const result = (await this.cbcsRepository.query(
      SP_GET_DATA(
        'BaoCaoPHQHs_CBCSs',
        `'MaCBCS = ${MaCBCS}'`,
        'MaBCPHQH',
        0,
        0,
      ),
    )) as [{ MaBCPHQH: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderBaoCaoPHQH.load(obj.MaBCPHQH),
    );
    return await Promise.all(resultLoader);
  }
  async LanhDaoPD_BaoCaoPHQHs(MaCBCS: number): Promise<BaoCaoPHQH[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoPHQHs', `'MaLanhDaoPD = ${MaCBCS}'`, 0, 0),
    );
  }
  async ToTruongTS_BaoCaoPHQHs(MaCBCS: number): Promise<BaoCaoPHQH[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoPHQHs', `'MaToTruongTS = ${MaCBCS}'`, 0, 0),
    );
  }
  async TSThucHien_BaoCaoPHPTs(MaCBCS: number): Promise<BaoCaoPHPT[]> {
    const result = (await this.cbcsRepository.query(
      SP_GET_DATA(
        'BaoCaoPHPTs_CBCSs',
        `'MaCBCS = ${MaCBCS}'`,
        'MaBCPHPT',
        0,
        0,
      ),
    )) as [{ MaBCPHPT: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderBaoCaoPHPT.load(obj.MaBCPHPT),
    );
    return await Promise.all(resultLoader);
  }
  async LanhDaoPD_BaoCaoKTDNs(MaCBCS: number): Promise<BaoCaoKTDN[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKTDNs', `'MaLanhDaoPD = ${MaCBCS}'`, 0, 0),
    );
  }
  async CBTongHop_BaoCaoKTDNs(MaCBCS: number): Promise<BaoCaoKTDN[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKTDNs', `'MaCBTongHop = ${MaCBCS}'`, 0, 0),
    );
  }
  async LanhDaoPD_BaoCaoKQXMQuanHes(
    MaCBCS: number,
  ): Promise<BaoCaoKQXMQuanHe[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKQXMQuanHes',
        `'MaLanhDaoPD = ${MaCBCS}'`,
        0,
        0,
      ),
    );
  }
  async BCHPhuTrach_BaoCaoKQXMQuanHes(
    MaCBCS: number,
  ): Promise<BaoCaoKQXMQuanHe[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKQXMQuanHes',
        `'BCHPhuTrach = ${MaCBCS}'`,
        0,
        0,
      ),
    );
  }
  async TSXacMinh_BaoCaoKQXMQuanHes(
    MaCBCS: number,
  ): Promise<BaoCaoKQXMQuanHe[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKQXMQuanHes',
        `'MaTSXacMinh = ${MaCBCS}'`,
        0,
        0,
      ),
    );
  }
  async LDDonViDN_DauMoiPHs(MaCBCS: number): Promise<DauMoiPH_DN[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA('DauMoiPH_DNs', `'MaLDDonViDN = ${MaCBCS}'`, 'MaDMPH', 0, 0),
    );
  }
  async CBTrucTiepPH_DauMoiPHs(MaCBCS: number): Promise<DauMoiPH_DN[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA(
        'DauMoiPH_DNs',
        `'MaCBTrucTiepPH = ${MaCBCS}'`,
        'MaDMPH',
        0,
        0,
      ),
    );
  }
  async DaiDienCATTPvaTD_KyDuyet_DNs(MaCBCS: number): Promise<KyDuyet_DN[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA(
        'KyDuyet_DNs',
        `'MaDaiDienCATTPvaTD = ${MaCBCS}'`,
        'MaKDDN',
        0,
        0,
      ),
    );
  }
  async DaiDienDonViDN_KyDuyet_DNs(MaCBCS: number): Promise<KyDuyet_DN[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA(
        'KyDuyet_DNs',
        `'MaDaiDienDonViDN = ${MaCBCS}'`,
        'MaKDDN',
        0,
        0,
      ),
    );
  }
  async DaiDienDonViTSNT_KyDuyet_DNs(MaCBCS: number): Promise<KyDuyet_DN[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA(
        'KyDuyet_DNs',
        `'MaDaiDienDonViTSNT = ${MaCBCS}'`,
        'MaKDDN',
        0,
        0,
      ),
    );
  }
  async LanhDaoPD_KeHoachTSNTs(MaCBCS: number): Promise<KeHoachTSNT[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('KeHoachTSNTs', `'MaLanhDaoPD = ${MaCBCS}'`, 0, 0),
    );
  }
  async BCHPhuTrach_KeHoachTSNTs(MaCBCS: number): Promise<KeHoachTSNT[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('KeHoachTSNTs', `'MaBCHPhuTrach = ${MaCBCS}'`, 0, 0),
    );
  }
  async TSXayDung_TramCTs(MaCBCS: number): Promise<TramCT[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('TramCTs', `'MaTSXayDung = ${MaCBCS}'`, 0, 0),
    );
  }
  async LanhDaoPD_TramCTs(MaCBCS: number): Promise<TramCT[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('TramCTs', `'MaLanhDaoPD = ${MaCBCS}'`, 0, 0),
    );
  }
  async LanhDaoPD_KetQuaXMQuanHes(MaCBCS: number): Promise<KetQuaXMQuanHe[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA(
        'KetQuaXMQuanHes',
        `'MaLanhDaoPD = ${MaCBCS}'`,
        'MaKQXMQH',
        0,
        0,
      ),
    );
  }
  async LucLuongThamGiaKHs(MaCBCS: number): Promise<LucLuongThamGiaKH[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA(
        'LucLuongThamGiaKHs',
        `'MaCBCS = ${MaCBCS}'`,
        'MaLLTGKH',
        0,
        0,
      ),
    );
  }
  async DanhGiaTSTHs(MaCBCS: number): Promise<DanhGiaTSTH[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA(
        'DanhGiaTSTHs',
        `'MaCBCS = ${MaCBCS}'`,
        'MaDanhGiaTSTH',
        0,
        0,
      ),
    );
  }
  async TSQuanLy_LLDBs(id: number): Promise<LLDB[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA('LLDBs', `'MaTSQuanLy = ${id}'`, 'MaLLDB', 0, 0),
    );
  }
  async LanhDaoPD_QuyetDinhTSNTs(MaCBCS: number): Promise<QuyetDinhTSNT[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('QuyetDinhTSNTs', `'MaLanhDaoPD = ${MaCBCS}'`, 0, 0),
    );
  }
  async ThanhVienBCAs(MaCBCS: number): Promise<ThanhVienBCA[]> {
    return this.cbcsRepository.query(
      SP_GET_DATA_DECRYPT('ThanhVienBCAs', `'MaCBCS = ${MaCBCS}'`, 0, 0),
    );
  }
}
