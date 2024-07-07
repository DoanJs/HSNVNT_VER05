import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
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
import { BienBanRKN_CBCSInput } from './type/BienBanRKN_CBCS.input';
import { BienBanRKN_CBCSType } from './type/BienBanRKN_CBCS.type';

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

  async bienBanRKNs_cbcss(
    utilsParams: UtilsParamsInput,
  ): Promise<BienBanRKN_CBCSType[]> {
    return this.bienbanRKNRepository.query(
      SP_GET_DATA(
        'BienBanRKNs_CBCSs',
        `'MaBBRKN != 0'`,
        'MaBBRKN',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async createBienBanRKN_CBCS(
    bienBanRKN_CBCSInput: BienBanRKN_CBCSInput,
    user: any,
  ): Promise<BienBanRKN_CBCSType> {
    const result = await this.bienbanRKNRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'BienBanRKNs_CBCSs',
        `'MaBBRKN, MaCBCS'`,
        `'  ${bienBanRKN_CBCSInput.MaBBRKN},
            ${bienBanRKN_CBCSInput.MaCBCS}
        '`,
        `'MaBBRKN = ${bienBanRKN_CBCSInput.MaBBRKN}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `{ MaBBRKN: ${bienBanRKN_CBCSInput.MaBBRKN}, MaCBCS: ${bienBanRKN_CBCSInput.MaCBCS} };`,
      TableName: 'BienBanRKNs_CBCSs',
    });
    return result[0];
  }

  async editBienBanRKN_CBCS(
    bienBanRKN_CBCSInput: BienBanRKN_CBCSInput,
    MaBBRKN: number,
    MaCBCS: number,
    user: any,
  ): Promise<BienBanRKN_CBCSType> {
    await this.bienbanRKNRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'BienBanRKNs_CBCSs',
        null,
        null,
        null,
        `'  MaBBRKN = ${bienBanRKN_CBCSInput.MaBBRKN},
            MaCBCS = ${bienBanRKN_CBCSInput.MaCBCS}
        '`,
        `'MaBBRKN = ${MaBBRKN} AND MaCBCS = ${MaCBCS}'`,
      ),
    );
    const result = await this.bienbanRKNRepository.query(
      SP_GET_DATA(
        'BienBanRKNs_CBCSs',
        `'MaBBRKN = ${bienBanRKN_CBCSInput.MaBBRKN} AND MaCBCS = ${bienBanRKN_CBCSInput.MaCBCS}'`,
        'MaBBRKN',
        0,
        0,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `{ MaBBRKN: ${bienBanRKN_CBCSInput.MaBBRKN}, MaCBCS: ${bienBanRKN_CBCSInput.MaCBCS} };`,
      TableName: 'BienBanRKNs_CBCSs',
    });
    return result[0];
  }

  async deleteBienBanRKN_CBCS(
    MaBBRKN: number,
    MaCBCS: number,
    user: any,
  ): Promise<BienBanRKN_CBCSType> {
    const result = await this.bienbanRKNRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'BienBanRKNs_CBCSs',
        null,
        null,
        null,
        null,
        `'MaBBRKN = ${MaBBRKN} AND MaCBCS = ${MaCBCS}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `{ MaBBRKN: ${MaBBRKN}, MaCBCS: ${MaCBCS} };`,
      TableName: 'BienBanRKNs_CBCSs',
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

  async ThanhPhanTDs(MaBBRKN: number): Promise<CBCS[]> {
    const result = (await this.bienbanRKNRepository.query(
      SP_GET_DATA(
        'BienBanRKNs_CBCSs',
        `'MaBBRKN = ${MaBBRKN}'`,
        'MaBBRKN',
        0,
        0,
      ),
    )) as [{ MaCBCS: number }];
    const resultLoader = result.map((obj: any) =>
      this.dataloaderService.loaderCBCS.load(obj.MaCBCS),
    );
    return await Promise.all(resultLoader);
  }
}
