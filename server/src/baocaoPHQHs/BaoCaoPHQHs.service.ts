import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { BaoCaoKQXMQuanHe } from 'src/baocaoKQXMQuanHes/BaoCaoKQXMQuanHe.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { KetQuaXMQuanHe } from 'src/ketQuaXMQuanHes/KetQuaXMQuanHe.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import {
  SP_CHANGE_BAOCAOPHQH,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { BaoCaoPHQH } from './BaoCaoPHQH.model';
import { BaoCaoPHQHInput } from './type/BaoCaoPHQH.input';

@Injectable()
export class BaoCaoPHQHsService {
  constructor(
    @InjectRepository(BaoCaoPHQH)
    private baocaoPHQHRepository: Repository<BaoCaoPHQH>,
    private dataloaderService: DataLoaderService,
    private actionDBsService: ActionDBsService,
  ) {}
  public readonly baocaoPHQH_DataInput = (
    Type: string,
    MaBCPHQH: number | null,
    baocaoPHQH: BaoCaoPHQHInput,
  ) => {
    return {
      Type,
      MaBCPHQH,
      BaoCaoPHQHInput: {
        Ngay: baocaoPHQH.Ngay ? baocaoPHQH.Ngay : null,
        BiDanh: baocaoPHQH.BiDanh ? `N'${baocaoPHQH.BiDanh}'` : null,
        ThoiGianPH: baocaoPHQH.ThoiGianPH ? baocaoPHQH.ThoiGianPH : null,
        DiaDiemPH: baocaoPHQH.DiaDiemPH ? `N'${baocaoPHQH.DiaDiemPH}'` : null,
        HinhAnh: `N'${baocaoPHQH.HinhAnh}'`, //crypto
        DDNhanDang: baocaoPHQH.DDNhanDang
          ? `N'${baocaoPHQH.DDNhanDang}'`
          : null,
        DiaChiCC: `N'${baocaoPHQH.DiaChiCC}'`, //crypto
        TSNhanXet: baocaoPHQH.TSNhanXet ? `N'${baocaoPHQH.TSNhanXet}'` : null,
        MaKQ: baocaoPHQH.MaKQ ? baocaoPHQH.MaKQ : null,
        MaToTruongTS: baocaoPHQH.MaToTruongTS ? baocaoPHQH.MaToTruongTS : null,
        MaLanhDaoPD: baocaoPHQH.MaLanhDaoPD ? baocaoPHQH.MaLanhDaoPD : null,
      },
    };
  };

  baocaoPHQHs(utilsParams: UtilsParamsInput): Promise<BaoCaoPHQH[]> {
    return this.baocaoPHQHRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoPHQHs',
        "'MaBCPHQH != 0'",
        utilsParams.skip && utilsParams.skip > 0 ? utilsParams.skip : 0,
        utilsParams.take && utilsParams.take > 0 ? utilsParams.take : 0,
      ),
    );
  }

  async baocaoPHQH(id: number): Promise<BaoCaoPHQH> {
    const result = await this.baocaoPHQHRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoPHQHs', `"MaBCPHQH = ${id}"`, 0, 1),
    );
    return result[0];
  }

  async createBaoCaoPHQH(
    baocaoPHQHInput: BaoCaoPHQHInput,
    user: any,
  ): Promise<BaoCaoPHQH> {
    const result = await this.baocaoPHQHRepository.query(
      SP_CHANGE_BAOCAOPHQH(
        this.baocaoPHQH_DataInput('CREATE', null, baocaoPHQHInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaBCPHQH: ${result[0].MaBCPHQH};`,
      TableName: 'BaoCaoPHQHs',
    });
    return result[0];
  }

  async editBaoCaoPHQH(
    baocaoPHQHInput: BaoCaoPHQHInput,
    id: number,
    user: any,
  ): Promise<BaoCaoPHQH> {
    const result = await this.baocaoPHQHRepository.query(
      SP_CHANGE_BAOCAOPHQH(
        this.baocaoPHQH_DataInput('EDIT', id, baocaoPHQHInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaBCPHQH: ${result[0].MaBCPHQH};`,
      TableName: 'BaoCaoPHQHs',
    });
    return result[0];
  }

  async deleteBaoCaoPHQH(
    baocaoPHQHInput: BaoCaoPHQHInput,
    id: number,
    user: any,
  ): Promise<BaoCaoPHQH> {
    const result = await this.baocaoPHQHRepository.query(
      SP_CHANGE_BAOCAOPHQH(
        this.baocaoPHQH_DataInput('DELETE', id, baocaoPHQHInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaBCPHQH: ${result[0].MaBCPHQH};`,
      TableName: 'BaoCaoPHQHs',
    });
    return result[0];
  }

  // ResolveField
  async KetQuaTSNT(baocaoPHQH: any): Promise<KetQuaTSNT> {
    if (baocaoPHQH.MaKQ) {
      return this.dataloaderService.loaderKetQuaTSNT.load(baocaoPHQH.MaKQ);
    }
  }

  async LanhDaoPD(baocaoPHQH: any): Promise<CBCS> {
    if (baocaoPHQH.MaLanhDaoPD) {
      return this.dataloaderService.loaderCBCS.load(baocaoPHQH.MaLanhDaoPD);
    }
  }

  async ToTruongTS(baocaoPHQH: any): Promise<CBCS> {
    if (baocaoPHQH.MaToTruongTS) {
      return this.dataloaderService.loaderCBCS.load(baocaoPHQH.MaToTruongTS);
    }
  }

  async TSThucHiens(MaBCPHQH: number): Promise<CBCS[]> {
    const result = (await this.baocaoPHQHRepository.query(
      `SELECT MaCBCS FROM BaoCaoPHQHs_CBCSs WHERE MaBCPHQH = ${MaBCPHQH}`,
    )) as [{ MaCBCS: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderCBCS.load(obj.MaCBCS),
    );
    return await Promise.all(resultLoader);
  }

  async BaoCaoKQXMQuanHe(MaBCPHQH: number): Promise<BaoCaoKQXMQuanHe> {
    const result = await this.baocaoPHQHRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKQXMQuanHes',
        `"MaBCPHQH = ${MaBCPHQH}"`,
        0,
        1,
      ),
    );
    return result[0];
  }

  async KetQuaXMQuanHe(MaBCPHQH: number): Promise<KetQuaXMQuanHe> {
    const result = await this.baocaoPHQHRepository.query(
      SP_GET_DATA(
        'KetQuaXMQuanHes',
        `"MaBCPHQH = ${MaBCPHQH}"`,
        'MaKQXMQH',
        0,
        1,
      ),
    );
    return result[0];
  }
}
