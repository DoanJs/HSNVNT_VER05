import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import {
  SP_CHANGE_BAOCAOPHPT,
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { BaoCaoPHPT } from './BaoCaoPHPT.model';
import { BaoCaoPHPTInput } from './type/BaoCaoPHPT.input';
import { BaoCaoPHPT_CBCSType } from './type/BaoCaoPHPT_CBCS.type';
import { BaoCaoPHPT_CBCSInput } from './type/BaoCaoPHDC_CBCS.input';

@Injectable()
export class BaoCaoPHPTsService {
  constructor(
    @InjectRepository(BaoCaoPHPT)
    private baocaoPHPTRepository: Repository<BaoCaoPHPT>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}
  public readonly BaoCaoPHPT_DataInput = (
    Type: string,
    MaBCPHPT: number | null,
    baocaoPHPTInput: BaoCaoPHPTInput,
  ) => {
    return {
      Type,
      MaBCPHPT,
      BaoCaoPHPTInput: {
        ThoiGianPH: baocaoPHPTInput.ThoiGianPH
          ? `N'${baocaoPHPTInput.ThoiGianPH}'`
          : null,
        DiaDiemPH: baocaoPHPTInput.DiaDiemPH
          ? `N'${baocaoPHPTInput.DiaDiemPH}'`
          : null,
        MaKQ: baocaoPHPTInput.MaKQ ? baocaoPHPTInput.MaKQ : null,
        BKS: `N'${baocaoPHPTInput.BKS}'`, // crypto
        HinhAnh: `N'${baocaoPHPTInput.HinhAnh}'`, // crypto
      },
    };
  };

  baocaoPHPTs(utilsParams: UtilsParamsInput): Promise<BaoCaoPHPT[]> {
    return this.baocaoPHPTRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoPHPTs',
        "'MaBCPHPT != 0'",
        utilsParams.skip && utilsParams.skip > 0 ? utilsParams.skip : 0,
        utilsParams.take && utilsParams.take > 0 ? utilsParams.take : 0,
      ),
    );
  }

  async baocaoPHPT(id: number): Promise<BaoCaoPHPT> {
    const result = await this.baocaoPHPTRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoPHPTs', `'MaBCPHPT = ${id}'`, 0, 1),
    );
    return result[0];
  }

  async createBaoCaoPHPT(
    baocaoPHPTInput: BaoCaoPHPTInput,
    user: any,
  ): Promise<BaoCaoPHPT> {
    const result = await this.baocaoPHPTRepository.query(
      SP_CHANGE_BAOCAOPHPT(
        this.BaoCaoPHPT_DataInput('CREATE', null, baocaoPHPTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaBCPHPT: ${result[0].MaBCPHPT};`,
      TableName: 'BaoCaoPHPTs',
    });
    return result[0];
  }

  async editBaoCaoPHPT(
    baocaoPHPTInput: BaoCaoPHPTInput,
    id: number,
    user: any,
  ): Promise<BaoCaoPHPT> {
    const result = await this.baocaoPHPTRepository.query(
      SP_CHANGE_BAOCAOPHPT(
        this.BaoCaoPHPT_DataInput('EDIT', id, baocaoPHPTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaBCPHPT: ${result[0].MaBCPHPT};`,
      TableName: 'BaoCaoPHPTs',
    });
    return result[0];
  }

  async deleteBaoCaoPHPT(
    baocaoPHPTInput: BaoCaoPHPTInput,
    id: number,
    user: any,
  ): Promise<BaoCaoPHPT> {
    const result = await this.baocaoPHPTRepository.query(
      SP_CHANGE_BAOCAOPHPT(
        this.BaoCaoPHPT_DataInput('DELETE', id, baocaoPHPTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaBCPHPT: ${result[0].MaBCPHPT};`,
      TableName: 'BaoCaoPHPTs',
    });
    return result[0];
  }

  async baocaoPHPTs_cbcss(
    utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoPHPT_CBCSType[]> {
    return this.baocaoPHPTRepository.query(
      SP_GET_DATA(
        'BaoCaoPHPTs_CBCSs',
        `'MaBCPHPT != 0'`,
        'MaBCPHPT',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }
  
  async createBaoCaoPHPT_CBCS(
    baocaoPHPT_cbcsInput: BaoCaoPHPT_CBCSInput,
    user: any,
  ): Promise<BaoCaoPHPT_CBCSType> {
    const result = await this.baocaoPHPTRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'BaoCaoPHPTs_CBCSs',
        `'MaBCPHPT, MaCBCS'`,
        `'  ${baocaoPHPT_cbcsInput.MaBCPHPT},
            ${baocaoPHPT_cbcsInput.MaCBCS}
        '`,
        `'MaBCPHPT = ${baocaoPHPT_cbcsInput.MaBCPHPT}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `{ MaBCPHPT: ${baocaoPHPT_cbcsInput.MaBCPHPT}, MaCBCS: ${baocaoPHPT_cbcsInput.MaCBCS} };`,
      TableName: 'BaoCaoPHPTs_CBCSs',
    });
    return result[0];
  }
  
  async editBaoCaoPHPT_CBCS(
    baocaoPHPT_cbcsInput: BaoCaoPHPT_CBCSInput,
    MaBCPHPT: number,
    MaCBCS: number,
    user: any,
  ): Promise<BaoCaoPHPT_CBCSType> {
    await this.baocaoPHPTRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'BaoCaoPHPTs_CBCSs',
        null,
        null,
        null,
        `'  MaBCPHPT = ${baocaoPHPT_cbcsInput.MaBCPHPT},
            MaCBCS = ${baocaoPHPT_cbcsInput.MaCBCS}
        '`,
        `'MaBCPHPT = ${MaBCPHPT} AND MaCBCS = ${MaCBCS}'`,
      ),
    );
    const result = await this.baocaoPHPTRepository.query(
      SP_GET_DATA(
        'BaoCaoPHPTs_CBCSs',
        `'MaBCPHPT = ${baocaoPHPT_cbcsInput.MaBCPHPT} AND MaCBCS = ${baocaoPHPT_cbcsInput.MaCBCS}'`,
        'MaBCPHPT',
        0,
        0,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `{ MaBCPHPT: ${baocaoPHPT_cbcsInput.MaBCPHPT}, MaCBCS: ${baocaoPHPT_cbcsInput.MaCBCS} };`,
      TableName: 'BaoCaoPHPTs_CBCSs',
    });
    return result[0];
  }
  
  async deleteBaoCaoPHPT_CBCS(
    MaBCPHPT: number,
    MaCBCS: number,
    user: any,
  ): Promise<BaoCaoPHPT_CBCSType> {
    const result = await this.baocaoPHPTRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'BaoCaoPHPTs_CBCSs',
        null,
        null,
        null,
        null,
        `'MaBCPHPT = ${MaBCPHPT} AND MaCBCS = ${MaCBCS}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `{ MaBCPHPT: ${MaBCPHPT}, MaCBCS: ${MaCBCS} };`,
      TableName: 'BaoCaoPHPTs_CBCSs',
    });
    return result[0];
  }
  
  // ResolveField

  async KetQuaTSNT(baocaoPHPT: any): Promise<KetQuaTSNT> {
    if (baocaoPHPT.MaKQ) {
      return this.dataloaderService.loaderKetQuaTSNT.load(baocaoPHPT.MaKQ);
    }
  }

  async TSThucHiens(MaBCPHPT: number): Promise<CBCS[]> {
    const result = (await this.baocaoPHPTRepository.query(
      SP_GET_DATA(
        'BaoCaoPHPTs_CBCSs',
        `'MaBCPHPT = ${MaBCPHPT}'`,
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
}
