import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import {
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { Doi } from './Doi.model';
import { DoiInput } from './type/Doi.Input';

@Injectable()
export class DoisService {
  constructor(
    @InjectRepository(Doi) private doiRepository: Repository<Doi>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly doi_DataInput = (doiInput: DoiInput) => {
    return {
      TenDoi: doiInput.TenDoi ? `N''${doiInput.TenDoi}''` : null,
      MaCAQHvaTD: doiInput.MaCAQHvaTD ? doiInput.MaCAQHvaTD : null,
    };
  };

  dois(utilsParams: UtilsParamsInput): Promise<Doi[]> {
    return this.doiRepository.query(
      SP_GET_DATA(
        'Dois',
        `'MaDoi != 0'`,
        'MaDoi',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async doi(id: number): Promise<Doi> {
    const result = await this.doiRepository.query(
      SP_GET_DATA('Dois', `'MaDoi = ${id}'`, 'MaDoi', 0, 1),
    );
    return result[0];
  }

  async createDoi(doiInput: DoiInput, user: any): Promise<Doi> {
    const result = await this.doiRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'Dois',
        `'TenDoi, MaCAQHvaTD'`,
        `N' ${this.doi_DataInput(doiInput).TenDoi},
            ${this.doi_DataInput(doiInput).MaCAQHvaTD}
        '`,
        "'MaDoi = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaDoi: ${result[0].MaDoi};`,
      TableName: 'Dois',
    });
    return result[0];
  }

  async editDoi(doiInput: DoiInput, id: number, user: any): Promise<Doi> {
    const result = await this.doiRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'Dois',
        null,
        null,
        null,
        `N' TenDoi = ${this.doi_DataInput(doiInput).TenDoi},
            MaCAQHvaTD = ${this.doi_DataInput(doiInput).MaCAQHvaTD}
        '`,
        `'MaDoi = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaDoi: ${result[0].MaDoi};`,
      TableName: 'Dois',
    });
    return result[0];
  }

  async deleteDoi(id: number, user: any): Promise<Doi> {
    const result = await this.doiRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'Dois',
        null,
        null,
        null,
        null,
        `'MaDoi = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaDoi: ${result[0].MaDoi};`,
      TableName: 'Dois',
    });
    return result[0];
  }

  // ResolveField

  async CAQHvaTD(doi: any): Promise<CAQHvaTD> {
    if (doi.MaCAQHvaTD) {
      return this.dataloaderService.loaderCAQHvaTD.load(doi.MaCAQHvaTD);
    }
  }

  CBCSs(MaDoi: number): Promise<CBCS[]> {
    return this.doiRepository.query(
      SP_GET_DATA_DECRYPT('CBCSs', `'MaDoi = ${MaDoi}'`, 0, 0),
    );
  }

  QuyetDinhTSNTs(MaDoi: number): Promise<QuyetDinhTSNT[]> {
    return this.doiRepository.query(
      SP_GET_DATA_DECRYPT('QuyetDinhTSNTs', `'MaDoi = ${MaDoi}'`, 0, 0),
    );
  }
}
