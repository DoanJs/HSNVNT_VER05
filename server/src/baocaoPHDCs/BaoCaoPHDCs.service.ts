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
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { BaoCaoPHDC } from './BaoCaoPHDC.model';
import { BaoCaoPHDCInput } from './type/BaoCaoPHDC.Input';
import { BaoCaoPHDC_CBCSType } from './type/BaoCaoPHDC_CBCS.type';
import { BaoCaoPHDC_CBCSInput } from './type/BaoCaoPHDC_CBCS.input';

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
          ? `N'${baocaoPHDCInput.ThoiGianPH}'`
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
    console.log(baocaoPHDCInput);
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
// many-to-many

async baocaoPHDCs_cbcss(
  utilsParams: UtilsParamsInput,
): Promise<BaoCaoPHDC_CBCSType[]> {
  return this.baocaoPHDCRepository.query(
    SP_GET_DATA(
      'BaoCaoPHDCs_CBCSs',
      `'MaBCPHDC != 0'`,
      'MaBCPHDC',
      utilsParams.skip ? utilsParams.skip : 0,
      utilsParams.take ? utilsParams.take : 0,
    ),
  );
}

async createBaoCaoPHDC_CBCS(
  baocaoPHDC_cbcsInput: BaoCaoPHDC_CBCSInput,
  user: any,
): Promise<BaoCaoPHDC_CBCSType> {
  const result = await this.baocaoPHDCRepository.query(
    SP_CHANGE_DATA(
      "'CREATE'",
      'BaoCaoPHDCs_CBCSs',
      `'MaBCPHDC, MaCBCS'`,
      `'  ${baocaoPHDC_cbcsInput.MaBCPHDC},
          ${baocaoPHDC_cbcsInput.MaCBCS}
      '`,
      `'MaBCPHDC = ${baocaoPHDC_cbcsInput.MaBCPHDC}'`,
    ),
  );
  this.actionDBsService.createActionDB({
    MaHistory: user.MaHistory,
    Action: 'CREATE',
    Other: `{ MaBCPHDC: ${baocaoPHDC_cbcsInput.MaBCPHDC}, MaCBCS: ${baocaoPHDC_cbcsInput.MaCBCS} };`,
    TableName: 'BaoCaoPHDCs_CBCSs',
  });
  return result[0];
}

async editBaoCaoPHDC_CBCS(
  baocaoPHDC_cbcsInput: BaoCaoPHDC_CBCSInput,
  MaBCPHDC: number,
  MaCBCS: number,
  user: any,
): Promise<BaoCaoPHDC_CBCSType> {
  await this.baocaoPHDCRepository.query(
    SP_CHANGE_DATA(
      "'EDIT'",
      'BaoCaoPHDCs_CBCSs',
      null,
      null,
      null,
      `'  MaBCPHDC = ${baocaoPHDC_cbcsInput.MaBCPHDC},
          MaCBCS = ${baocaoPHDC_cbcsInput.MaCBCS}
      '`,
      `'MaBCPHDC = ${MaBCPHDC} AND MaCBCS = ${MaCBCS}'`,
    ),
  );
  const result = await this.baocaoPHDCRepository.query(
    SP_GET_DATA(
      'BaoCaoPHDCs_CBCSs',
      `'MaBCPHDC = ${baocaoPHDC_cbcsInput.MaBCPHDC} AND MaCBCS = ${baocaoPHDC_cbcsInput.MaCBCS}'`,
      'MaBCPHDC',
      0,
      0,
    ),
  );
  this.actionDBsService.createActionDB({
    MaHistory: user.MaHistory,
    Action: 'EDIT',
    Other: `{ MaBCPHDC: ${baocaoPHDC_cbcsInput.MaBCPHDC}, MaCBCS: ${baocaoPHDC_cbcsInput.MaCBCS} };`,
    TableName: 'BaoCaoPHDCs_CBCSs',
  });
  return result[0];
}

async deleteBaoCaoPHDC_CBCS(
  MaBCPHDC: number,
  MaCBCS: number,
  user: any,
): Promise<BaoCaoPHDC_CBCSType> {
  const result = await this.baocaoPHDCRepository.query(
    SP_CHANGE_DATA(
      "'DELETE'",
      'BaoCaoPHDCs_CBCSs',
      null,
      null,
      null,
      null,
      `'MaBCPHDC = ${MaBCPHDC} AND MaCBCS = ${MaCBCS}'`,
    ),
  );
  this.actionDBsService.createActionDB({
    MaHistory: user.MaHistory,
    Action: 'DELETE',
    Other: `{ MaBCPHDC: ${MaBCPHDC}, MaCBCS: ${MaCBCS} };`,
    TableName: 'BaoCaoPHDCs_CBCSs',
  });
  return result[0];
}

  // ResolveField
  async KetQuaTSNT(baocaoPHDC: any): Promise<KetQuaTSNT> {
    if (baocaoPHDC.MaKQ) {
      return this.dataloaderService.loaderKetQuaTSNT.load(baocaoPHDC.MaKQ);
    }
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
