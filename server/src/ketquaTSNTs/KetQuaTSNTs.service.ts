import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BaoCaoKTDN } from 'src/baocaoKTDNs/BaoCaoKTDN.model';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import { BaoCaoPHPT } from 'src/baocaoPHPTs/BaoCaoPHPT.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { BienBanRKN } from 'src/bienbanRKNs/BienBanRKN.model';
import { DanhGiaTSTH } from 'src/danhgiaTSTHs/DanhGiaTSTH.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
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
import { KetQuaTSNT_TinhTPType } from './type/KetQuaTSNT_TinhTP.type';
import { KetQuaTSNT_TinhTPInput } from './type/KetQuaTSNT_TinhTP.input';

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
      DDNB: ketquaTSNTInput.DDNB ? `N''${ketquaTSNTInput.DDNB}''` : null,
      MaKH: ketquaTSNTInput.MaKH ? ketquaTSNTInput.MaKH : null,
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
        "'ThoiGianBD, ThoiGianKT, DDNB, MaKH'",
        `N' ${this.ketquaTSNT_DataInput(ketquaTSNTInput).ThoiGianBD},
            ${this.ketquaTSNT_DataInput(ketquaTSNTInput).ThoiGianKT},
            ${this.ketquaTSNT_DataInput(ketquaTSNTInput).DDNB},
            ${this.ketquaTSNT_DataInput(ketquaTSNTInput).MaKH}
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
            DDNB = ${this.ketquaTSNT_DataInput(ketquaTSNTInput).DDNB},
            MaKH = ${this.ketquaTSNT_DataInput(ketquaTSNTInput).MaKH}
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

  // many-to-many relation

  ketquaTSNTs_tinhTPs(
    utilsParams: UtilsParamsInput,
  ): Promise<KetQuaTSNT_TinhTPType[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA(
        'KetQuaTSNTs_TinhTPs',
        `'MaKQ != 0'`,
        'MaKQ',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async createKetQuaTSNT_TinhTP(
    ketquatsnt_tinhtpInput: KetQuaTSNT_TinhTPInput,
    user: any,
  ): Promise<KetQuaTSNT_TinhTPType> {
    const result = await this.ketquaTSNTRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'KetQuaTSNTs_TinhTPs',
        `'MaTinhTP, MaKQ'`,
        `'  ${ketquatsnt_tinhtpInput.MaTinhTP},
            ${ketquatsnt_tinhtpInput.MaKQ}
        '`,
        `'MaTinhTP = ${ketquatsnt_tinhtpInput.MaTinhTP}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `{ MaTinhTP: ${ketquatsnt_tinhtpInput.MaTinhTP}, MaKQ: ${ketquatsnt_tinhtpInput.MaKQ} };`,
      TableName: 'KetQuaTSNTs_TinhTPs',
    });
    return result[0];
  }

  async editKetQuaTSNT_TinhTP(
    ketquatsnt_tinhtpInput: KetQuaTSNT_TinhTPInput,
    MaTinhTP: number,
    MaKQ: number,
    user: any,
  ): Promise<KetQuaTSNT_TinhTPType> {
    await this.ketquaTSNTRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'KetQuaTSNTs_TinhTPs',
        null,
        null,
        null,
        `'  MaTinhTP = ${ketquatsnt_tinhtpInput.MaTinhTP},
            MaKQ = ${ketquatsnt_tinhtpInput.MaKQ}
        '`,
        `'MaTinhTP = ${MaTinhTP} AND MaKQ = ${MaKQ}'`,
      ),
    );
    const result = await this.ketquaTSNTRepository.query(
      SP_GET_DATA(
        'KetQuaTSNTs_TinhTPs',
        `'MaTinhTP = ${ketquatsnt_tinhtpInput.MaTinhTP} AND MaKQ = ${ketquatsnt_tinhtpInput.MaKQ}'`,
        'MaTinhTP',
        0,
        0,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `{ MaTinhTP: ${ketquatsnt_tinhtpInput.MaTinhTP}, MaKQ: ${ketquatsnt_tinhtpInput.MaKQ} };`,
      TableName: 'KetQuaTSNTs_TinhTPs',
    });
    return result[0];
  }

  async deleteKetQuaTSNT_TinhTP(
    MaTinhTP: number,
    MaKQ: number,
    user: any,
  ): Promise<KetQuaTSNT_TinhTPType> {
    const result = await this.ketquaTSNTRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'KetQuaTSNTs_TinhTPs',
        null,
        null,
        null,
        null,
        `'MaTinhTP = ${MaTinhTP} AND MaKQ = ${MaKQ}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `{ MaTinhTP: ${MaTinhTP}, MaKQ: ${MaKQ} };`,
      TableName: 'KetQuaTSNTs_TinhTPs',
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
  async PhamViTSs(MaKQ: number): Promise<TinhTP[]> {
    const result = (await this.ketquaTSNTRepository.query(
      SP_GET_DATA('KetQuaTSNTs_TinhTPs', `'MaKQ = ${MaKQ}'`, 'MaTinhTP', 0, 0),
    )) as [{ MaTinhTP: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderTinhTP.load(obj.MaTinhTP),
    );
    return await Promise.all(resultLoader);
  }
  async BaoCaoPHDCs(MaKQ: number): Promise<BaoCaoPHDC[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoPHDCs', `'MaKQ = ${MaKQ}'`, 0, 0),
    );
  }
  async BaoCaoKQGHs(MaKQ: number): Promise<BaoCaoKQGH[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKQGHs', `'MaKQ = ${MaKQ}'`, 0, 0),
    );
  }
  async BienBanRKN(MaKQ: number): Promise<BienBanRKN> {
    const result = await this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('BienBanRKNs', `'MaKQ = ${MaKQ}'`, 0, 1),
    );
    return result[0];
  }
  async BaoCaoPHQHs(MaKQ: number): Promise<BaoCaoPHQH[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoPHQHs', `'MaKQ = ${MaKQ}'`, 0, 0),
    );
  }
  async BaoCaoPHPTs(MaKQ: number): Promise<BaoCaoPHPT[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoPHPTs', `'MaKQ = ${MaKQ}'`, 0, 0),
    );
  }
  async BaoCaoKTDN(MaKQ: number): Promise<BaoCaoKTDN> {
    const result = await this.ketquaTSNTRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKTDNs', `"MaKQ = ${MaKQ}"`, 0, 1),
    );
    return result[0];
  }
  async DanhGiaTSTHs(MaKQ: number): Promise<DanhGiaTSTH[]> {
    return this.ketquaTSNTRepository.query(
      SP_GET_DATA('DanhGiaTSTHs', `'MaKQ = ${MaKQ}'`, 'MaDanhGiaTSTH', 0, 0),
    );
  }
}
