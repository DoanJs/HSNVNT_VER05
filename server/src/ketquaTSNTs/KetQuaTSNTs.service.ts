import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BaoCaoKTDN } from 'src/baocaoKTDNs/BaoCaoKTDN.model';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { DanhGiaTSTH } from 'src/danhgiaTSTHs/DanhGiaTSTH.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TinhTP } from 'src/tinhTPs/TinhTP.model';
import {
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { KetQuaTSNT } from './KetQuaTSNT.model';
import { KetQuaTSNTInput } from './type/KetQuaTSNT.input';
import BaoCaoPHPT from 'src/baocaoPHPTs/BaoCaoPHPT.model';

@Injectable()
export class KetQuaTSNTsService {
  constructor(
    @InjectRepository(KetQuaTSNT)
    private ketquaTSNTRepository: Repository<KetQuaTSNT>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}
  public readonly ketquaTSNT_DataInput = (ketquaTSNTInput: KetQuaTSNTInput) => {
    return {
      ThoiGianBD: ketquaTSNTInput.ThoiGianBD
        ? `N''${ketquaTSNTInput.ThoiGianBD}''`
        : null,
      ThoiGianKT: ketquaTSNTInput.ThoiGianKT
        ? `N''${ketquaTSNTInput.ThoiGianKT}''`
        : null,
      MaQD: ketquaTSNTInput.MaQD ? ketquaTSNTInput.MaQD : null,
      MaKH: ketquaTSNTInput.MaKH ? ketquaTSNTInput.MaKH : null,
      MaCATTPvaTD: ketquaTSNTInput.MaCATTPvaTD
        ? ketquaTSNTInput.MaCATTPvaTD
        : null,
      MaCAQHvaTD: ketquaTSNTInput.MaCAQHvaTD
        ? ketquaTSNTInput.MaCAQHvaTD
        : null,
      MaDoi: ketquaTSNTInput.MaDoi ? ketquaTSNTInput.MaDoi : null,
      MaDoiTuong: ketquaTSNTInput.MaDoiTuong
        ? ketquaTSNTInput.MaDoiTuong
        : null,
    };
  };

  ketquaTSNTs(utilsParams: UtilsParamsInput): Promise<KetQuaTSNT[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA(
        'KetQuaTSNTs',
        "'MaKQ != 0'",
        'MaKQ',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async ketquaTSNT(id: number): Promise<KetQuaTSNT> {
    const result = await this.ketquaTSNTRepository.query(
      SP_GET_DATA('KetQuaTSNTs', `'MaKQ = ${id}'`, 'MaKQ', 0, 1),
    );
    return result[0];
  }

  async createKetQuaTSNT(
    ketquaTSNTInput: KetQuaTSNTInput,
    user: any,
  ): Promise<KetQuaTSNT> {
    const result = await this.ketquaTSNTRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'KetQuaTSNTs',
        "'ThoiGianBD, ThoiGianKT, MaKH, MaQD, MaCATTPvaTD, MaCAQHvaTD, MaDoi, MaDoiTuong'",
        `N' ${this.ketquaTSNT_DataInput(ketquaTSNTInput).ThoiGianBD},
            ${this.ketquaTSNT_DataInput(ketquaTSNTInput).ThoiGianKT},
            ${this.ketquaTSNT_DataInput(ketquaTSNTInput).MaKH},
            ${this.ketquaTSNT_DataInput(ketquaTSNTInput).MaQD},
            ${this.ketquaTSNT_DataInput(ketquaTSNTInput).MaCATTPvaTD},
            ${this.ketquaTSNT_DataInput(ketquaTSNTInput).MaCAQHvaTD},
            ${this.ketquaTSNT_DataInput(ketquaTSNTInput).MaDoi},
            ${this.ketquaTSNT_DataInput(ketquaTSNTInput).MaDoiTuong}
        '`,
        "'MaKQ = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaKQ: ${result[0].MaKQ};`,
      TableName: 'KetQuaTSNTs',
    });
    return result[0];
  }

  async editKetQuaTSNT(
    ketquaTSNTInput: KetQuaTSNTInput,
    id: number,
    user: any,
  ): Promise<KetQuaTSNT> {
    const result = await this.ketquaTSNTRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'KetQuaTSNTs',
        null,
        null,
        null,
        `N' ThoiGianBD = ${
          this.ketquaTSNT_DataInput(ketquaTSNTInput).ThoiGianBD
        },
            ThoiGianKT = ${
              this.ketquaTSNT_DataInput(ketquaTSNTInput).ThoiGianKT
            },
            MaKH = ${this.ketquaTSNT_DataInput(ketquaTSNTInput).MaKH},
            MaQD = ${this.ketquaTSNT_DataInput(ketquaTSNTInput).MaQD},
            MaCATTPvaTD = ${
              this.ketquaTSNT_DataInput(ketquaTSNTInput).MaCATTPvaTD
            },
            MaCAQHvaTD = ${
              this.ketquaTSNT_DataInput(ketquaTSNTInput).MaCAQHvaTD
            },
            MaDoi = ${this.ketquaTSNT_DataInput(ketquaTSNTInput).MaDoi},
            MaDoiTuong = ${
              this.ketquaTSNT_DataInput(ketquaTSNTInput).MaDoiTuong
            }
        '`,
        `'MaKQ = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaKQ: ${result[0].MaKQ};`,
      TableName: 'KetQuaTSNTs',
    });
    return result[0];
  }

  async deleteKetQuaTSNT(id: number, user: any): Promise<KetQuaTSNT> {
    const result = await this.ketquaTSNTRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'KetQuaTSNTs',
        null,
        null,
        null,
        null,
        `'MaKQ = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaKQ: ${result[0].MaKQ};`,
      TableName: 'KetQuaTSNTs',
    });
    return result[0];
  }

  // ResolveField

  async KeHoachTSNT(ketquaTSNT: any): Promise<KeHoachTSNT> {
    const result = await this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('KeHoachTSNTs', `'MaKH = ${ketquaTSNT.MaKH}'`, 0, 1),
    );
    return result[0];
  }

  async QuyetDinhTSNT(ketquaTSNT: any): Promise<QuyetDinhTSNT> {
    const result = await this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT(
        'QuyetDinhTSNTs',
        `'MaQD = ${ketquaTSNT.MaQD}'`,
        0,
        1,
      ),
    );
    return result[0];
  }
  async PhamViTSs(MaKQ: number): Promise<TinhTP[]> {
    const result = (await this.ketquaTSNTRepository.query(
      SP_GET_DATA(
        'KetQuaTSNTs_TinhTPs',
        `'MaKQTSNT = ${MaKQ}'`,
        'MaTinhTP',
        0,
        0,
      ),
    )) as [{ MaTinhTP: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderTinhTP.load(obj.MaTinhTP),
    );
    return await Promise.all(resultLoader);
  }

  async DanhGiaTSTHs(MaKQ: number): Promise<DanhGiaTSTH[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA('DanhGiaTSTHs', `'MaKQ = ${MaKQ}'`, 'MaDanhGiaTSTH', 0, 0),
    );
  }

  async BaoCaoKTDN(MaKQ: number): Promise<BaoCaoKTDN> {
    console.log(MaKQ);
    const result = await this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKTDNs', `"MaKQ = ${MaKQ}"`, 0, 1),
    );
    return result[0];
  }

  async BaoCaoPHQHs(MaKQ: number): Promise<BaoCaoPHQH[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoPHQHs', `'MaKQ = ${MaKQ}'`, 0, 0),
    );
  }

  async BaoCaoKQGHs(MaKQ: number): Promise<BaoCaoKQGH[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKQGHs', `'MaKQ = ${MaKQ}'`, 0, 0),
    );
  }

  async BaoCaoPHDCs(MaKQ: number): Promise<BaoCaoPHDC[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoPHDCs', `'MaKQ = ${MaKQ}'`, 0, 0),
    );
  }

  async BaoCaoPHPTs(MaKQ: number): Promise<BaoCaoPHPT[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoPHPTs', `'MaKQ = ${MaKQ}'`, 0, 0),
    );
  }
}
