import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { QuocTich } from 'src/quoctichs/QuocTich.model';
import {
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { DanToc } from './DanToc.model';
import { DanTocInput } from './type/DanToc.Input';

@Injectable()
export class DanTocsService {
  constructor(
    @InjectRepository(DanToc) private dantocRepository: Repository<DanToc>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly dantoc_DataInput = (dantocInput: DanTocInput) => {
    return {
      TenDT: dantocInput.TenDT ? `N''${dantocInput.TenDT}''` : null,
      MaQT: dantocInput.MaQT ? dantocInput.MaQT : null,
    };
  };

  async dantocs(utilsParams: UtilsParamsInput): Promise<DanToc[]> {
    return await this.dantocRepository.query(
      SP_GET_DATA(
        'DanTocs',
        `'MaDT != 0'`,
        'MaDT',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async dantoc(id: number): Promise<DanToc> {
    const result = await this.dantocRepository.query(
      SP_GET_DATA('DanTocs', `'MaDT = ${id}'`, 'MaDT', 0, 1),
    );
    return result[0];
  }

  async createDanToc(danTocInput: DanTocInput, user: any): Promise<DanToc> {
    const result = await this.dantocRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'DanTocs',
        "'TenDT, MaQT'",
        `N' ${this.dantoc_DataInput(danTocInput).TenDT},
            ${this.dantoc_DataInput(danTocInput).MaQT}
        '`,
        "'MaDT = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaDT: ${result[0].MaDT};`,
      TableName: 'DanTocs',
    });
    return result[0];
  }

  async editDanToc(
    danTocInput: DanTocInput,
    id: number,
    user: any,
  ): Promise<DanToc> {
    const result = await this.dantocRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'DanTocs',
        null,
        null,
        null,
        `N' TenDT = ${this.dantoc_DataInput(danTocInput).TenDT},
            MaQT = ${this.dantoc_DataInput(danTocInput).MaQT}
        '`,
        `'MaDT = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaDT: ${result[0].MaDT};`,
      TableName: 'DanTocs',
    });
    return result[0];
  }

  async deleteDanToc(id: number, user: any): Promise<DanToc> {
    const result = await this.dantocRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'DanTocs',
        null,
        null,
        null,
        null,
        `'MaDT = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaDT: ${result[0].MaDT};`,
      TableName: 'DanTocs',
    });
    return result[0];
  }

  //  ResolveField

  async QuocTich(danToc: any): Promise<QuocTich> {
    if (danToc.MaQT) {
      return this.dataloaderService.loaderQuocTich.load(danToc.MaQT);
    }
  }

  DoiTuongs(MaDT: number): Promise<DoiTuong[]> {
    return this.dantocRepository.query(
      SP_GET_DATA_DECRYPT('DoiTuongs', `'MaDT = ${MaDT}'`, 0, 0),
    );
  }

  CBCSs(MaDT: number): Promise<CBCS[]> {
    return this.dantocRepository.query(
      SP_GET_DATA_DECRYPT('CBCSs', `'MaDT = ${MaDT}'`, 0, 0),
    );
  }
}
