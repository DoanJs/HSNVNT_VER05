import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import {
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { KetQuaXMDiaChi } from './KetQuaXMDiaChi.model';
import { KetQuaXMDiaChiInput } from './type/KetQuaXMDiaChi.input';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';

@Injectable()
export class KetQuaXMDiaChisService {
  constructor(
    @InjectRepository(KetQuaXMDiaChi)
    private ketQuaXMDiaChiRepository: Repository<KetQuaXMDiaChi>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly ketquaXMDiaChi_DataInput = (
    ketquaXMDiaChiInput: KetQuaXMDiaChiInput,
  ) => {
    return {
      So: ketquaXMDiaChiInput.So ? `N''${ketquaXMDiaChiInput.So}''` : null,
      Ngay: ketquaXMDiaChiInput.Ngay
        ? `N''${ketquaXMDiaChiInput.Ngay}''`
        : null,
      MaQD: ketquaXMDiaChiInput.MaQD ? ketquaXMDiaChiInput.MaQD : null,
      MaDN: ketquaXMDiaChiInput.MaDN ? ketquaXMDiaChiInput.MaDN : null,
      MaCATTPvaTD: ketquaXMDiaChiInput.MaCATTPvaTD
        ? ketquaXMDiaChiInput.MaCATTPvaTD
        : null,
      MaCAQHvaTD: ketquaXMDiaChiInput.MaCAQHvaTD
        ? ketquaXMDiaChiInput.MaCAQHvaTD
        : null,
      MaDoiTuong: ketquaXMDiaChiInput.MaDoiTuong
        ? ketquaXMDiaChiInput.MaDoiTuong
        : null,
      MaLanhDaoPD: ketquaXMDiaChiInput.MaLanhDaoPD
        ? ketquaXMDiaChiInput.MaLanhDaoPD
        : null,
      MaDC: ketquaXMDiaChiInput.MaDC ? ketquaXMDiaChiInput.MaDC : null,
    };
  };

  ketQuaXMDiaChis(utilsParams: UtilsParamsInput): Promise<KetQuaXMDiaChi[]> {
    return this.ketQuaXMDiaChiRepository.query(
      SP_GET_DATA(
        'KetQuaXMDiaChis',
        "'MaKQXMDC != 0'",
        'MaKQXMDC',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async ketQuaXMDiaChi(id: number): Promise<KetQuaXMDiaChi> {
    const result = await this.ketQuaXMDiaChiRepository.query(
      SP_GET_DATA('KetQuaXMDiaChis', `'MaKQXMDC = ${id}'`, 'MaKQXMDC', 0, 1),
    );
    return result[0];
  }

  async createKetQuaXMDiaChi(
    ketQuaXMDiaChi: KetQuaXMDiaChiInput,
    user: any,
  ): Promise<KetQuaXMDiaChi> {
    const result = await this.ketQuaXMDiaChiRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'KetQuaXMDiaChis',
        "'So, Ngay, MaCATTPvaTD, MaCAQHvaTD, MaDoiTuong, MaQD, MaDN, MaDC, MaLanhDaoPD'",
        `N' ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).So},
            ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).Ngay},
            ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaCATTPvaTD},
            ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaCAQHvaTD},
            ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaDoiTuong},
            ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaQD},
            ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaDN},
            ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaDC},
            ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaLanhDaoPD}
        '`,
        "'MaKQXMDC = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaKQXMDC: ${result[0].MaKQXMDC};`,
      TableName: 'KetQuaXMDiaChis',
    });
    return result[0];
  }

  async editKetQuaXMDiaChi(
    ketQuaXMDiaChi: KetQuaXMDiaChiInput,
    id: number,
    user: any,
  ): Promise<KetQuaXMDiaChi> {
    const result = await this.ketQuaXMDiaChiRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'KetQuaXMDiaChis',
        null,
        null,
        null,
        `N' So = ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).So},
            Ngay = ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).Ngay},
            MaCATTPvaTD = ${
              this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaCATTPvaTD
            },
            MaCAQHvaTD = ${
              this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaCAQHvaTD
            },
            MaDoiTuong = ${
              this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaDoiTuong
            },
            MaQD = ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaQD},
            MaDN = ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaDN},
            MaDC = ${this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaDC},
            MaLanhDaoPD = ${
              this.ketquaXMDiaChi_DataInput(ketQuaXMDiaChi).MaLanhDaoPD
            }
        '`,
        `'MaKQXMDC = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaKQXMDC: ${result[0].MaKQXMDC};`,
      TableName: 'KetQuaXMDiaChis',
    });
    return result[0];
  }

  async deleteKetQuaXMDiaChi(id: number, user: any): Promise<KetQuaXMDiaChi> {
    const result = await this.ketQuaXMDiaChiRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'KetQuaXMDiaChis',
        null,
        null,
        null,
        null,
        `'MaKQXMDC = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaKQXMDC: ${result[0].MaKQXMDC};`,
      TableName: 'KetQuaXMDiaChis',
    });
    return result[0];
  }

  // ResolveField

  async BaoCaoPHDC(ketquaXMDiaChi: any): Promise<BaoCaoPHDC> {
    const result = await this.ketQuaXMDiaChiRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoPHDCs',
        `'MaBCPHDC  = ${ketquaXMDiaChi.MaBCPHDC}'`,
        0,
        1,
      ),
    );
    return result[0];
  }

  async DeNghiTSNT(ketquaXMDiaChi: any): Promise<DeNghiTSNT> {
    return this.dataloaderService.loaderDeNghiTSNT.load(ketquaXMDiaChi.MaDN);
  }

  async QuyetDinhTSNT(ketquaXMDiaChi: any): Promise<QuyetDinhTSNT> {
    return this.dataloaderService.loaderQuyetDinhTSNT.load(ketquaXMDiaChi.MaQD);
  }

  async CATTPvaTD(ketquaXMDiaChi: any): Promise<CATTPvaTD> {
    return this.dataloaderService.loaderCATTPvaTD.load(
      ketquaXMDiaChi.MaCATTPvaTD,
    );
  }

  async CAQHvaTD(ketquaXMDiaChi: any): Promise<CAQHvaTD> {
    return this.dataloaderService.loaderCAQHvaTD.load(
      ketquaXMDiaChi.MaCAQHvaTD,
    );
  }

  async DoiTuong(ketquaXMDiaChi: any): Promise<DoiTuong> {
    return this.dataloaderService.loaderDoiTuong.load(
      ketquaXMDiaChi.MaDoiTuong,
    );
  }

  async LanhDaoPD(ketquaXMDiaChi: any): Promise<CBCS> {
    return this.dataloaderService.loaderCBCS.load(ketquaXMDiaChi.MaLanhDaoPD);
  }
}
