import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import {
  SP_CHANGE_BIENBANRKN,
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
}
