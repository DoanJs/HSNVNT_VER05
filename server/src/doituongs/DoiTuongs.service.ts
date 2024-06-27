import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BienPhapDT } from 'src/bienPhapDTs/BienPhapDT.model';
import { DanToc } from 'src/dantocs/DanToc.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { DoiTuongCA } from 'src/doituongCAs/DoiTuongCA.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { LoaiDT } from 'src/loaiDTs/LoaiDT.model';
import { QuocTich } from 'src/quoctichs/QuocTich.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TinhChatDT } from 'src/tinhchatDTs/TinhChatDT.model';
import { TonGiao } from 'src/tongiaos/TonGiao.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import {
  SP_CHANGE_DATA,
  SP_CHANGE_DOITUONG,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { DoiTuong } from './DoiTuong.model';
import { DoiTuongInput } from './type/DoiTuong.input';
import { BienPhapDT_DoiTuongType } from './type/BienPhapDT_DoiTuong.type';
import { BienPhapDT_DoiTuongInput } from './type/BienPhapDT_DoiTuong.input';

@Injectable()
export class DoiTuongsService {
  constructor(
    @InjectRepository(DoiTuong)
    private doituongRepository: Repository<DoiTuong>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly doituong_DataInput = (
    Type: string,
    MaDoiTuong: number | null,
    doituongInput: DoiTuongInput,
  ) => {
    return {
      Type,
      MaDoiTuong,
      DoiTuongInput: {
        TenKhac: doituongInput.TenKhac ? `N'${doituongInput.TenKhac}'` : null,
        GioiTinh: doituongInput.GioiTinh ? doituongInput.GioiTinh : null,
        NgaySinh: doituongInput.NgaySinh
          ? `N'${doituongInput.NgaySinh}'`
          : null,
        NoiSinh: doituongInput.NoiSinh ? `N'${doituongInput.NoiSinh}'` : null,
        QueQuan: doituongInput.QueQuan ? `N'${doituongInput.QueQuan}'` : null,
        HKTT: doituongInput.HKTT ? `N'${doituongInput.HKTT}'` : null,
        NgheNghiep: doituongInput.NgheNghiep
          ? `N'${doituongInput.NgheNghiep}'`
          : null,
        ChucVu: doituongInput.ChucVu ? `N'${doituongInput.ChucVu}'` : null,
        NoiLamViec: doituongInput.NoiLamViec
          ? `N'${doituongInput.NoiLamViec}'`
          : null,
        PhuongTien: doituongInput.PhuongTien
          ? `N'${doituongInput.PhuongTien}'`
          : null,
        ThongTinKhac: doituongInput.ThongTinKhac
          ? `N'${doituongInput.ThongTinKhac}'`
          : null,
        MaQT: doituongInput.MaQT ? doituongInput.MaQT : null,
        MaDT: doituongInput.MaDT ? doituongInput.MaDT : null,
        MaTG: doituongInput.MaTG ? doituongInput.MaTG : null,
        MaTC: doituongInput.MaTC ? doituongInput.MaTC : null,
        MaLoai: doituongInput.MaLoai ? doituongInput.MaLoai : null,
        MaTramCT: doituongInput.MaTramCT ? doituongInput.MaTramCT : null,
        TenDT: `N'${doituongInput.TenDT}'`, // crypto
        CCCD: `N'${doituongInput.CCCD}'`, // crypto
        CMND: `N'${doituongInput.CMND}'`, // crypto
        SHC: `N'${doituongInput.SHC}'`, // crypto
        AnhDD: `N'${doituongInput.AnhDD}'`, // crypto
        NoiO: `N'${doituongInput.NoiO}'`, // crypto
        SDT: `N'${doituongInput.SDT}'`, // crypto
      },
    };
  };

  async doituongs(utilsParams: UtilsParamsInput): Promise<DoiTuong[]> {
    return this.doituongRepository.query(
      SP_GET_DATA_DECRYPT(
        'DoiTuongs',
        "'MaDoiTuong != 0'",
        utilsParams.skip && utilsParams.skip > 0 ? utilsParams.skip : 0,
        utilsParams.take && utilsParams.take > 0 ? utilsParams.take : 0,
      ),
    );
  }

  async doituong(id: number): Promise<DoiTuong> {
    const result = await this.doituongRepository.query(
      SP_GET_DATA_DECRYPT('DoiTuongs', `"MaDoiTuong = ${id}"`, 0, 1),
    );
    return result[0];
  }

  async createDoiTuong(
    doituongInput: DoiTuongInput,
    user: any,
  ): Promise<DoiTuong> {
    const result = await this.doituongRepository.query(
      SP_CHANGE_DOITUONG(
        this.doituong_DataInput('CREATE', null, doituongInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaDoiTuong: ${result[0].MaDoiTuong};`,
      TableName: 'DoiTuongs',
    });
    return result[0];
  }

  async editDoiTuong(
    doituongInput: DoiTuongInput,
    id: number,
    user: any,
  ): Promise<DoiTuong> {
    const result = await this.doituongRepository.query(
      SP_CHANGE_DOITUONG(this.doituong_DataInput('EDIT', id, doituongInput)),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaDoiTuong: ${result[0].MaDoiTuong};`,
      TableName: 'DoiTuongs',
    });
    return result[0];
  }

  async deleteDoiTuong(
    doituongInput: DoiTuongInput,
    id: number,
    user: any,
  ): Promise<DoiTuong> {
    const result = await this.doituongRepository.query(
      SP_CHANGE_DOITUONG(this.doituong_DataInput('DELETE', id, doituongInput)),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaDoiTuong: ${result[0].MaDoiTuong};`,
      TableName: 'DoiTuongs',
    });
    return result[0];
  }

  // many-to-many relation

  async bienphapDTs_doituongs(
    utilsParams: UtilsParamsInput,
  ): Promise<BienPhapDT_DoiTuongType[]> {
    return this.doituongRepository.query(
      SP_GET_DATA(
        'BienPhapDTs_DoiTuongs',
        `'MaBPDT != 0'`,
        'MaBPDT',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async createBienPhapDT_DoiTuong(
    bienphapdt_doituongInput: BienPhapDT_DoiTuongInput,
    user: any,
  ): Promise<BienPhapDT_DoiTuongType> {
    const result = await this.doituongRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'BienPhapDTs_DoiTuongs',
        `'MaBPDT, MaDoiTuong'`,
        `'  ${bienphapdt_doituongInput.MaBPDT},
            ${bienphapdt_doituongInput.MaDoiTuong}
        '`,
        `'MaBPDT = ${bienphapdt_doituongInput.MaBPDT}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `{ MaBPDT: ${bienphapdt_doituongInput.MaBPDT}, MaDoiTuong: ${bienphapdt_doituongInput.MaDoiTuong} };`,
      TableName: 'BienPhapDTs_DoiTuongs',
    });
    return result[0];
  }

  async editBienPhapDT_DoiTuong(
    bienphapdt_doituongInput: BienPhapDT_DoiTuongInput,
    MaBPDT: number,
    MaDoiTuong: number,
    user: any,
  ): Promise<BienPhapDT_DoiTuongType> {
    await this.doituongRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'BienPhapDTs_DoiTuongs',
        null,
        null,
        null,
        `'  MaBPDT = ${bienphapdt_doituongInput.MaBPDT},
            MaDoiTuong = ${bienphapdt_doituongInput.MaDoiTuong}
        '`,
        `'MaBPDT = ${MaBPDT} AND MaDoiTuong = ${MaDoiTuong}'`,
      ),
    );
    const result = await this.doituongRepository.query(
      SP_GET_DATA(
        'BienPhapDTs_DoiTuongs',
        `'MaBPDT = ${bienphapdt_doituongInput.MaBPDT} AND MaDoiTuong = ${bienphapdt_doituongInput.MaDoiTuong}'`,
        'MaBPDT',
        0,
        0,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `{ MaBPDT: ${bienphapdt_doituongInput.MaBPDT}, MaDoiTuong: ${bienphapdt_doituongInput.MaDoiTuong} };`,
      TableName: 'BienPhapDTs_DoiTuongs',
    });
    return result[0];
  }

  async deleteBienPhapDT_DoiTuong(
    MaBPDT: number,
    MaDoiTuong: number,
    user: any,
  ): Promise<BienPhapDT_DoiTuongType> {
    const result = await this.doituongRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'BienPhapDTs_DoiTuongs',
        null,
        null,
        null,
        null,
        `'MaBPDT = ${MaBPDT} AND MaDoiTuong = ${MaDoiTuong}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `{ MaBPDT: ${MaBPDT}, MaDoiTuong: ${MaDoiTuong} };`,
      TableName: 'BienPhapDTs_DoiTuongs',
    });
    return result[0];
  }
  // ResolveField

  async BienPhapDTs(MaDoiTuong: number): Promise<BienPhapDT[]> {
    const result = (await this.doituongRepository.query(
      SP_GET_DATA(
        'BienPhapDTs_DoiTuongs',
        `'MaDoiTuong = ${MaDoiTuong}'`,
        'MaBPDT',
        0,
        0,
      ),
    )) as [{ MaBPDT: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderBienPhapDT.load(obj.MaBPDT),
    );
    return await Promise.all(resultLoader);
  }

  async QuocTich(doituong: any): Promise<QuocTich> {
    if (doituong.MaQT) {
      return this.dataloaderService.loaderQuocTich.load(doituong.MaQT);
    }
  }

  async DanToc(doituong: any): Promise<DanToc> {
    if (doituong.MaDT) {
      return this.dataloaderService.loaderDanToc.load(doituong.MaDT);
    }
  }

  async TonGiao(doituong: any): Promise<TonGiao> {
    if (doituong.MaTG) {
      return this.dataloaderService.loaderTonGiao.load(doituong.MaTG);
    }
  }

  async TinhChatDT(doituong: any): Promise<TinhChatDT> {
    if (doituong.MaTC) {
      return this.dataloaderService.loaderTinhChat.load(doituong.MaTC);
    }
  }

  async LoaiDT(doituong: any): Promise<LoaiDT> {
    if (doituong.MaLoai) {
      return this.dataloaderService.loaderLoaiDT.load(doituong.MaLoai);
    }
  }

  async DoiTuongCAs(MaDoiTuong: number): Promise<DoiTuongCA[]> {
    return this.doituongRepository.query(
      SP_GET_DATA(
        'DoiTuongCAs',
        `'MaDoiTuong = ${MaDoiTuong}'`,
        'MaDTCA',
        0,
        0,
      ),
    );
  }

  async QuyetDinhTSNTs(MaDoiTuong: number): Promise<QuyetDinhTSNT[]> {
    return this.doituongRepository.query(
      SP_GET_DATA_DECRYPT(
        'QuyetDinhTSNTs',
        `'MaDoiTuong = ${MaDoiTuong}'`,
        0,
        0,
      ),
    );
  }

  async DeNghiTSNTs(MaDoiTuong: number): Promise<DeNghiTSNT[]> {
    return this.doituongRepository.query(
      SP_GET_DATA_DECRYPT('DeNghiTSNTs', `'MaDoiTuong = ${MaDoiTuong}'`, 0, 0),
    );
  }

  async KeHoachTSNTs(MaDoiTuong: number): Promise<KeHoachTSNT[]> {
    return this.doituongRepository.query(
      SP_GET_DATA_DECRYPT('KeHoachTSNTs', `'MaDoiTuong = ${MaDoiTuong}'`, 0, 0),
    );
  }

  async BaoCaoKQGHs(MaDoiTuong: number): Promise<BaoCaoKQGH[]> {
    return this.doituongRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKQGHs', `'MaDoiTuong = ${MaDoiTuong}'`, 0, 0),
    );
  }

  async TramCT(doituong: any): Promise<TramCT> {
    if (doituong.MaTramCT) {
      return this.dataloaderService.loaderTramCT.load(doituong.MaTramCT);
    }
  }
}
