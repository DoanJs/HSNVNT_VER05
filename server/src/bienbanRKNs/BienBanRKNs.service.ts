import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import {
  SP_CHANGE_BIENBANRKN,
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { BienBanRKN } from './BienBanRKN.model';
import { BienBanRKNInput } from './type/BienBanRKN.Input';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { BienBanRKN_LanhDaoTGType } from './type/BienBanRKN_LanhDaoTG.type';
import { BienBanRKN_LanhDaoTGInput } from './type/BienBanRKN_LanhDaoTG.input';

@Injectable()
export class BienBanRKNsService {
  constructor(
    @InjectRepository(BienBanRKN)
    private bienbanRKNRepository: Repository<BienBanRKN>,
    private actionDBsService: ActionDBsService,
    private readonly dataloaderService: DataLoaderService,
  ) {}

  public readonly bienbanRKN_DataInput = (
    Type: string,
    MaBBRKN: number | null,
    bienbanRKNInput: BienBanRKNInput,
  ) => {
    return {
      Type,
      MaBBRKN,
      BienBanRKNInput: {
        Ngay: bienbanRKNInput.Ngay ? `N'${bienbanRKNInput.Ngay}'` : null,
        DanhGiaLDP: `N'${bienbanRKNInput.DanhGiaLDP}'`, //crypto
        DanhGiaTS: `N'${bienbanRKNInput.DanhGiaTS}'`, //crypto
        DanhGiaDT: `N'${bienbanRKNInput.DanhGiaDT}'`, //crypto
        KetLuan: bienbanRKNInput.KetLuan
          ? `N'${bienbanRKNInput.KetLuan}'`
          : null,
        DeXuat: bienbanRKNInput.DeXuat ? `N'${bienbanRKNInput.DeXuat}'` : null,
        MaKQ: bienbanRKNInput.MaKQ ? bienbanRKNInput.MaKQ : null,
        MaChuToa: bienbanRKNInput.MaChuToa ? bienbanRKNInput.MaChuToa : null,
        MaThuKy: bienbanRKNInput.MaThuKy ? bienbanRKNInput.MaThuKy : null,
      },
    };
  };

  bienBanRKNs(utilsParams: UtilsParamsInput): Promise<BienBanRKN[]> {
    return this.bienbanRKNRepository.query(
      SP_GET_DATA_DECRYPT(
        'BienBanRKNs',
        "'MaBBRKN != 0'",
        utilsParams.skip && utilsParams.skip > 0 ? utilsParams.skip : 0,
        utilsParams.take && utilsParams.take > 0 ? utilsParams.take : 0,
      ),
    );
  }

  async bienBanRKN(id: number): Promise<BienBanRKN> {
    const result = await this.bienbanRKNRepository.query(
      SP_GET_DATA_DECRYPT('BienBanRKNs', `"MaBBRKN = ${id}"`, 0, 1),
    );
    return result[0];
  }

  async createBienBanRKN(
    bienbanRKNInput: BienBanRKNInput,
    user: any,
  ): Promise<BienBanRKN> {
    const result = await this.bienbanRKNRepository.query(
      SP_CHANGE_BIENBANRKN(
        this.bienbanRKN_DataInput('CREATE', null, bienbanRKNInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaBBRKN: ${result[0].MaBBRKN};`,
      TableName: 'BienBanRKNs',
    });
    return result[0];
  }

  async editBienBanRKN(
    bienbanRKNInput: BienBanRKNInput,
    id: number,
    user: any,
  ): Promise<BienBanRKN> {
    const result = await this.bienbanRKNRepository.query(
      SP_CHANGE_BIENBANRKN(
        this.bienbanRKN_DataInput('EDIT', id, bienbanRKNInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaBBRKN: ${result[0].MaBBRKN};`,
      TableName: 'BienBanRKNs',
    });
    return result[0];
  }

  async deleteBienBanRKN(
    bienbanRKNInput: BienBanRKNInput,
    id: number,
    user: any,
  ): Promise<BienBanRKN> {
    const result = await this.bienbanRKNRepository.query(
      SP_CHANGE_BIENBANRKN(
        this.bienbanRKN_DataInput('DELETE', id, bienbanRKNInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaBBRKN: ${result[0].MaBBRKN};`,
      TableName: 'BienBanRKNs',
    });
    return result[0];
  }

  // many-to-many

  async bienBanRKNs_lanhDaoTGs(
    utilsParams: UtilsParamsInput,
  ): Promise<BienBanRKN_LanhDaoTGType[]> {
    return this.bienbanRKNRepository.query(
      SP_GET_DATA(
        'BienBanRKNs_LanhDaoTGs',
        `'MaBBRKN != 0'`,
        'MaBBRKN',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async createBienBanRKN_LanhDaoTG(
    bienBanRKN_lanhDaoTGInput: BienBanRKN_LanhDaoTGInput,
    user: any,
  ): Promise<BienBanRKN_LanhDaoTGType> {
    const result = await this.bienbanRKNRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'BienBanRKNs_LanhDaoTGs',
        `'MaBBRKN, MaLanhDaoTG'`,
        `'  ${bienBanRKN_lanhDaoTGInput.MaBBRKN},
            ${bienBanRKN_lanhDaoTGInput.MaLanhDaoTG}
        '`,
        `'MaBBRKN = ${bienBanRKN_lanhDaoTGInput.MaBBRKN}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `{ MaBBRKN: ${bienBanRKN_lanhDaoTGInput.MaBBRKN}, MaLanhDaoTG: ${bienBanRKN_lanhDaoTGInput.MaLanhDaoTG} };`,
      TableName: 'BienBanRKNs_LanhDaoTGs',
    });
    return result[0];
  }

  async editBienBanRKN_LanhDaoTG(
    bienBanRKN_lanhDaoTGInput: BienBanRKN_LanhDaoTGInput,
    MaBBRKN: number,
    MaLanhDaoTG: number,
    user: any,
  ): Promise<BienBanRKN_LanhDaoTGType> {
    await this.bienbanRKNRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'BienBanRKNs_LanhDaoTGs',
        null,
        null,
        null,
        `'  MaBBRKN = ${bienBanRKN_lanhDaoTGInput.MaBBRKN},
            MaLanhDaoTG = ${bienBanRKN_lanhDaoTGInput.MaLanhDaoTG}
        '`,
        `'MaBBRKN = ${MaBBRKN} AND MaLanhDaoTG = ${MaLanhDaoTG}'`,
      ),
    );
    const result = await this.bienbanRKNRepository.query(
      SP_GET_DATA(
        'BienBanRKNs_LanhDaoTGs',
        `'MaBBRKN = ${bienBanRKN_lanhDaoTGInput.MaBBRKN} AND MaLanhDaoTG = ${bienBanRKN_lanhDaoTGInput.MaLanhDaoTG}'`,
        'MaBBRKN',
        0,
        0,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `{ MaBBRKN: ${bienBanRKN_lanhDaoTGInput.MaBBRKN}, MaLanhDaoTG: ${bienBanRKN_lanhDaoTGInput.MaLanhDaoTG} };`,
      TableName: 'BienBanRKNs_LanhDaoTGs',
    });
    return result[0];
  }

  async deleteBienBanRKN_LanhDaoTG(
    MaBBRKN: number,
    MaLanhDaoTG: number,
    user: any,
  ): Promise<BienBanRKN_LanhDaoTGType> {
    const result = await this.bienbanRKNRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'BienBanRKNs_LanhDaoTGs',
        null,
        null,
        null,
        null,
        `'MaBBRKN = ${MaBBRKN} AND MaLanhDaoTG = ${MaLanhDaoTG}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `{ MaBBRKN: ${MaBBRKN}, MaLanhDaoTG: ${MaLanhDaoTG} };`,
      TableName: 'BienBanRKNs_LanhDaoTGs',
    });
    return result[0];
  }

  // ResolveField

  async KetQuaTSNT(bienBanRKN: any): Promise<KetQuaTSNT> {
    const result = await this.bienbanRKNRepository.query(
      SP_GET_DATA('KetQuaTSNTs', `'MaKQ = ${bienBanRKN.MaKQ}'`, 'MaKQ', 0, 1),
    );
    return result[0];
  }

  async ChuToa(bienBanRKN: any): Promise<CBCS> {
    if (bienBanRKN.MaChuToa) {
      return this.dataloaderService.loaderCBCS.load(bienBanRKN.MaChuToa);
    }
  }

  async ThuKy(bienBanRKN: any): Promise<CBCS> {
    if (bienBanRKN.MaThuKy) {
      return this.dataloaderService.loaderCBCS.load(bienBanRKN.MaThuKy);
    }
  }

  async LanhDaoTGs(MaBBRKN: number): Promise<CBCS[]> {
    const result = await this.bienbanRKNRepository.query(
      SP_GET_DATA('BienBanRKNs_LanhDaoTGs', `'MaBBRKN = ${MaBBRKN}'`, 'MaBBRKN', 0, 0),
    ) as [{ MaLanhDaoTG: number }];
    const resultLoader = result.map((obj: any) =>
      this.dataloaderService.loaderCBCS.load(obj.MaLanhDaoTG),
    );
    return await Promise.all(resultLoader);
  }
}
