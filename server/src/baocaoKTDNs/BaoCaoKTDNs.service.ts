import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import {
  SP_CHANGE_BAOCAOKTDN,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { BaoCaoKTDN } from './BaoCaoKTDN.model';
import { BaoCaoKTDNInput } from './type/BaoCaoKTDN.input';

@Injectable()
export class BaoCaoKTDNsService {
  constructor(
    @InjectRepository(BaoCaoKTDN)
    private baocaoKTDNRepository: Repository<BaoCaoKTDN>,
    private actionDBsService: ActionDBsService,
    private dataloaderService: DataLoaderService,
  ) {}

  public readonly baocaoKTDN_DataInput = (
    Type: string,
    MaBCKTDN: number | null,
    baocaoKTDNInput: BaoCaoKTDNInput,
  ) => {
    return {
      Type,
      MaBCKTDN,
      BaoCaoKTDNInput: {
        Ngay: baocaoKTDNInput.Ngay ? `N'${baocaoKTDNInput.Ngay}'` : null,
        TinhHinhDT: `N'${baocaoKTDNInput.TinhHinhDT}'`,
        VanDeRKN: `N'${baocaoKTDNInput.VanDeRKN}'`,
        MaKQ: baocaoKTDNInput.MaKQ ? baocaoKTDNInput.MaKQ : null,
        MaLanhDaoPD: baocaoKTDNInput.MaLanhDaoPD
          ? baocaoKTDNInput.MaLanhDaoPD
          : null,
        MaCBTongHop: baocaoKTDNInput.MaCBTongHop
          ? baocaoKTDNInput.MaCBTongHop
          : null,
      },
    };
  };

  baoCaoKTDNs(utilsParams: UtilsParamsInput): Promise<BaoCaoKTDN[]> {
    return this.baocaoKTDNRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKTDNs',
        "'MaBCKTDN != 0'",
        utilsParams.skip && utilsParams.skip > 0 ? utilsParams.skip : 0,
        utilsParams.take && utilsParams.take > 0 ? utilsParams.take : 0,
      ),
    );
  }

  async baoCaoKTDN(id: number): Promise<BaoCaoKTDN> {
    const result = await this.baocaoKTDNRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKTDNs', `"MaBCKTDN = ${id}"`, 0, 1),
    );
    return result[0];
  }

  async createBaoCaoKTDN(
    baocaoKTDNInput: BaoCaoKTDNInput,
    user: any,
  ): Promise<BaoCaoKTDN> {
    const result = await this.baocaoKTDNRepository.query(
      SP_CHANGE_BAOCAOKTDN(
        this.baocaoKTDN_DataInput('CREATE', null, baocaoKTDNInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaBCKTDN: ${result[0].MaBCKTDN};`,
      TableName: 'BaoCaoKTDNs',
    });
    return result[0];
  }

  async editBaoCaoKTDN(
    baocaoKTDNInput: BaoCaoKTDNInput,
    id: number,
    user: any,
  ): Promise<BaoCaoKTDN> {
    const result = await this.baocaoKTDNRepository.query(
      SP_CHANGE_BAOCAOKTDN(
        this.baocaoKTDN_DataInput('EDIT', id, baocaoKTDNInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaBCKTDN: ${result[0].MaBCKTDN};`,
      TableName: 'BaoCaoKTDNs',
    });
    return result[0];
  }

  async deleteBaoCaoKTDN(
    baocaoKTDNInput: BaoCaoKTDNInput,
    id: number,
    user: any,
  ): Promise<BaoCaoKTDN> {
    const result = await this.baocaoKTDNRepository.query(
      SP_CHANGE_BAOCAOKTDN(
        this.baocaoKTDN_DataInput('DELETE', id, baocaoKTDNInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaBCKTDN: ${result[0].MaBCKTDN};`,
      TableName: 'BaoCaoKTDNs',
    });
    return result[0];
  }

  // ResolveField

  async KetQuaTSNT(baocaoKTDN: any): Promise<KetQuaTSNT> {
    const result = await this.baocaoKTDNRepository.query(
      SP_GET_DATA('KetQuaTSNTs', `'MaKQ = ${baocaoKTDN.MaKQ}'`, 'MaKQ', 0, 1),
    );
    return result[0];
  }

  async LanhDaoPD(baocaoKTDN: any): Promise<CBCS> {
    if (baocaoKTDN.MaLanhDaoPD) {
      return this.dataloaderService.loaderCBCS.load(baocaoKTDN.MaLanhDaoPD);
    }
  }

  async CBTongHop(baocaoKTDN: any): Promise<CBCS> {
    if (baocaoKTDN.MaCBTongHop) {
      return this.dataloaderService.loaderCBCS.load(baocaoKTDN.MaCBTongHop);
    }
  }
}
