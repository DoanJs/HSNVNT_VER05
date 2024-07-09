import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import {
  SP_CHANGE_BAOCAOPHPT,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { BaoCaoPHPT } from './BaoCaoPHPT.model';
import { BaoCaoPHPTInput } from './type/BaoCaoPHPT.input';

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
