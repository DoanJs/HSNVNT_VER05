import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { BaoCaoKQXMDiaChi } from 'src/baocaoKQXMDiaChis/BaoCaoKQXMDiaChi.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { KetQuaXMDiaChi } from 'src/ketQuaXMDiaChis/KetQuaXMDiaChi.model';
import {
  SP_CHANGE_BAOCAOPHDC,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { BaoCaoPHDC } from './BaoCaoPHDC.model';
import { BaoCaoPHDCInput } from './type/BaoCaoPHDC.Input';

@Injectable()
export class BaoCaoPHDCsService {
  constructor(
    @InjectRepository(BaoCaoPHDC)
    private baocaoPHDCRepository: Repository<BaoCaoPHDC>,
    private dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}
  public readonly BaoCaoPHDC_DataInput = (
    Type: string,
    MaBCPHDC: number | null,
    baocaoPHDCInput: BaoCaoPHDCInput,
  ) => {
    return {
      Type,
      MaBCPHDC,
      BaoCaoPHDCInput: {
        ThoiGianPH: baocaoPHDCInput.ThoiGianPH
          ? baocaoPHDCInput.ThoiGianPH
          : null,
        DiaChi: `N'${baocaoPHDCInput.DiaChi}'`, //crypto,
        HinhAnh: `N'${baocaoPHDCInput.HinhAnh}'`, //crypto,
        MaKQ: baocaoPHDCInput.MaKQ ? baocaoPHDCInput.MaKQ : null,
      },
    };
  };

  baocaoPHDCs(utilsParams: UtilsParamsInput): Promise<BaoCaoPHDC[]> {
    return this.baocaoPHDCRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoPHDCs',
        "'MaBCPHDC != 0'",
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async baocaoPHDC(id: number): Promise<BaoCaoPHDC> {
    const result = await this.baocaoPHDCRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoPHDCs', `'MaBCPHDC = ${id}'`, 0, 1),
    );
    return result[0];
  }

  async createBaoCaoPHDC(
    baocaoPHDCInput: BaoCaoPHDCInput,
    user: any,
  ): Promise<BaoCaoPHDC> {
    const result = await this.baocaoPHDCRepository.query(
      SP_CHANGE_BAOCAOPHDC(
        this.BaoCaoPHDC_DataInput('CREATE', null, baocaoPHDCInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaBCPHDC: ${result[0].MaBCPHDC};`,
      TableName: 'BaoCaoPHDCs',
    });
    return result[0];
  }

  async editBaoCaoPHDC(
    baocaoPHDCInput: BaoCaoPHDCInput,
    id: number,
    user: any,
  ): Promise<BaoCaoPHDC> {
    const result = await this.baocaoPHDCRepository.query(
      SP_CHANGE_BAOCAOPHDC(
        this.BaoCaoPHDC_DataInput('EDIT', id, baocaoPHDCInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaBCPHDC: ${result[0].MaBCPHDC};`,
      TableName: 'BaoCaoPHDCs',
    });
    return result[0];
  }

  async deleteBaoCaoPHDC(
    baocaoPHDCInput: BaoCaoPHDCInput,
    id: number,
    user: any,
  ): Promise<BaoCaoPHDC> {
    const result = await this.baocaoPHDCRepository.query(
      SP_CHANGE_BAOCAOPHDC(
        this.BaoCaoPHDC_DataInput('DELETE', id, baocaoPHDCInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaBCPHDC: ${result[0].MaBCPHDC};`,
      TableName: 'BaoCaoPHDCs',
    });
    return result[0];
  }

  // ResolveField
  async KetQuaTSNT(baocaoPHDC: any): Promise<KetQuaTSNT> {
    return this.dataloaderService.loaderKetQuaTSNT.load(baocaoPHDC.MaKQ);
  }

  async TSThucHiens(MaBCPHDC: number): Promise<CBCS[]> {
    const result = (await this.baocaoPHDCRepository.query(
      SP_GET_DATA(
        'BaoCaoPHDCs_CBCSs',
        `'MaBCPHDC = ${MaBCPHDC}'`,
        'MaCBCS',
        0,
        0,
      ),
    )) as [{ MaCBCS: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderCBCS.load(obj.MaCBCS),
    );
    return await Promise.all(resultLoader);
  }

  async BaoCaoKQXMDiaChi(MaBCPHDC: number): Promise<BaoCaoKQXMDiaChi> {
    const result = await this.baocaoPHDCRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKQXMDiaChis',
        `'MaBCPHDC = ${MaBCPHDC}'`,
        0,
        1,
      ),
    );
    return result[0];
  }

  async KetQuaXMDiaChi(MaBCPHDC: number): Promise<KetQuaXMDiaChi> {
    const result = await this.baocaoPHDCRepository.query(
      SP_GET_DATA(
        'KetQuaXMDiaChis',
        `'MaBCPHDC = ${MaBCPHDC}'`,
        'MaKQXMDC',
        0,
        1,
      ),
    );
    return result[0];
  }
}
