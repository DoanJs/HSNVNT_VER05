import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import {
  SP_CHANGE_BAOCAOKQXMDIACHI,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { BaoCaoKQXMDiaChi } from './BaoCaoKQXMDiaChi.model';
import { BaoCaoKQXMDiaChiInput } from './type/BaoCaoKQXMDiaChi.input';

@Injectable()
export default class BaoCaoKQXMDiaChisService {
  constructor(
    @InjectRepository(BaoCaoKQXMDiaChi)
    private baocaoKQXMDiaChiRepository: Repository<BaoCaoKQXMDiaChi>,
    private dataloaderService: DataLoaderService,
    private actionDBsService: ActionDBsService,
  ) {}
  public readonly baocaoKQXMDiaChi_DataInput = (
    Type: string,
    MaBCKQXMDC: number | null,
    baocaoKQXMDiaChiInput: BaoCaoKQXMDiaChiInput,
  ) => {
    return {
      Type,
      MaBCKQXMDC,
      BaoCaoKQXMDiaChiInput: {
        Ngay: baocaoKQXMDiaChiInput.Ngay
          ? `N'${baocaoKQXMDiaChiInput.Ngay}'`
          : null,
        HoTenChuHo: `N'${baocaoKQXMDiaChiInput.HoTenChuHo}'`, //crypto
        TenKhac: baocaoKQXMDiaChiInput.TenKhac
          ? `N'${baocaoKQXMDiaChiInput.TenKhac}'`
          : null,
        GioiTinh: baocaoKQXMDiaChiInput.GioiTinh
          ? baocaoKQXMDiaChiInput.GioiTinh
          : null,
        NamSinh: baocaoKQXMDiaChiInput.NamSinh
          ? baocaoKQXMDiaChiInput.NamSinh
          : null,
        QueQuan: baocaoKQXMDiaChiInput.QueQuan
          ? `N'${baocaoKQXMDiaChiInput.QueQuan}'`
          : null,
        HKTT: baocaoKQXMDiaChiInput.HKTT
          ? `N'${baocaoKQXMDiaChiInput.HKTT}'`
          : null,
        NoiO: `N'${baocaoKQXMDiaChiInput.NoiO}'`, //crypto
        NgheNghiep: baocaoKQXMDiaChiInput.NgheNghiep
          ? `N'${baocaoKQXMDiaChiInput.NgheNghiep}'`
          : null,
        NoiLamViec: baocaoKQXMDiaChiInput.NoiLamViec
          ? `N'${baocaoKQXMDiaChiInput.NoiLamViec}'`
          : null,
        QuanHeGiaDinh: `N'${baocaoKQXMDiaChiInput.QuanHeGiaDinh}'`, //crypto
        HoKhacCungDC: `N'${baocaoKQXMDiaChiInput.HoKhacCungDC}'`, //crypto
        BienPhapXM: baocaoKQXMDiaChiInput.BienPhapXM
          ? `N'${baocaoKQXMDiaChiInput.BienPhapXM}'`
          : null,
        MaBCPHDC: baocaoKQXMDiaChiInput.MaBCPHDC
          ? baocaoKQXMDiaChiInput.MaBCPHDC
          : null,
        MaTSXacMinh: baocaoKQXMDiaChiInput.MaTSXacMinh
          ? baocaoKQXMDiaChiInput.MaTSXacMinh
          : null,
        MaLanhDaoPD: baocaoKQXMDiaChiInput.MaLanhDaoPD
          ? baocaoKQXMDiaChiInput.MaLanhDaoPD
          : null,
        MaBCHPhuTrach: baocaoKQXMDiaChiInput.MaBCHPhuTrach
          ? baocaoKQXMDiaChiInput.MaBCHPhuTrach
          : null,
      },
    };
  };

  baocaoKQXMDiaChis(
    utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoKQXMDiaChi[]> {
    return this.baocaoKQXMDiaChiRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKQXMDiaChis',
        "'MaBCKQXMDC != 0'",
        utilsParams.skip && utilsParams.skip > 0 ? utilsParams.skip : 0,
        utilsParams.take && utilsParams.take > 0 ? utilsParams.take : 0,
      ),
    );
  }

  async baocaoKQXMDiaChi(id: number): Promise<BaoCaoKQXMDiaChi> {
    const result = await this.baocaoKQXMDiaChiRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKQXMDiaChis', `"MaBCKQXMDC = ${id}"`, 0, 1),
    );
    return result[0];
  }

  async createBaoCaoKQXMDiaChi(
    baocaoKQXMDiaChiInput: BaoCaoKQXMDiaChiInput,
    user: any,
  ): Promise<BaoCaoKQXMDiaChi> {
    const result = await this.baocaoKQXMDiaChiRepository.query(
      SP_CHANGE_BAOCAOKQXMDIACHI(
        this.baocaoKQXMDiaChi_DataInput('CREATE', null, baocaoKQXMDiaChiInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaBCKQXMDC: ${result[0].MaBCKQXMDC};`,
      TableName: 'BaoCaoKQXMDiaChis',
    });
    return result[0];
  }

  async editBaoCaoKQXMDiaChi(
    baocaoKQXMDiaChiInput: BaoCaoKQXMDiaChiInput,
    id: number,
    user: any,
  ): Promise<BaoCaoKQXMDiaChi> {
    const result = await this.baocaoKQXMDiaChiRepository.query(
      SP_CHANGE_BAOCAOKQXMDIACHI(
        this.baocaoKQXMDiaChi_DataInput('EDIT', id, baocaoKQXMDiaChiInput),
      ),
    );

    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaBCKQXMDC: ${result[0].MaBCKQXMDC};`,
      TableName: 'BaoCaoKQXMDiaChis',
    });
    return result[0];
  }

  async deleteBaoCaoKQXMDiaChi(
    baocaoKQXMDiaChiInput: BaoCaoKQXMDiaChiInput,
    id: number,
    user: any,
  ): Promise<BaoCaoKQXMDiaChi> {
    const result = await this.baocaoKQXMDiaChiRepository.query(
      SP_CHANGE_BAOCAOKQXMDIACHI(
        this.baocaoKQXMDiaChi_DataInput('DELETE', id, baocaoKQXMDiaChiInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaBCKQXMDC: ${result[0].MaBCKQXMDC};`,
      TableName: 'BaoCaoKQXMDiaChis',
    });
    return result[0];
  }

  // ResolveField ---------------------------
  async BaoCaoPHDC(baocaoKQXMDiaChi: any): Promise<BaoCaoPHDC> {
    const result = await this.baocaoKQXMDiaChiRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoPHDCs',
        `'MaBCPHDC = ${baocaoKQXMDiaChi.MaDiaChiNV}'`,
        0,
        1,
      ),
    );
    return result[0];
  }

  async TSXacMinh(baocaoKQXMDiaChi: any): Promise<CBCS> {
    return this.dataloaderService.loaderCBCS.load(baocaoKQXMDiaChi.MaTSXacMinh);
  }

  async LanhDaoPD(baocaoKQXMDiaChi: any): Promise<CBCS> {
    return this.dataloaderService.loaderCBCS.load(baocaoKQXMDiaChi.MaLanhDaoPD);
  }

  async BanChiHuy(baocaoKQXMDiaChi: any): Promise<CBCS> {
    return this.dataloaderService.loaderCBCS.load(baocaoKQXMDiaChi.MaBanChiHuy);
  }
}
