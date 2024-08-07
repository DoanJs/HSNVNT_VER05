import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CBCS } from 'src/cbcss/CBCS.model';
import {
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { ChucVu } from './ChucVu.model';

@Injectable()
export class ChucVusService {
  constructor(
    @InjectRepository(ChucVu) private chucVuRepository: Repository<ChucVu>,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly chucVu_DataInput = (chucVu: string) => {
    return {
      ChucVu: chucVu ? `N''${chucVu}''` : null,
    };
  };

  async chucVus(utilsParams: UtilsParamsInput): Promise<ChucVu[]> {
    return await this.chucVuRepository.query(
      SP_GET_DATA(
        'ChucVus',
        `'MaCV != 0'`,
        'MaCV',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async chucVu(id: number): Promise<ChucVu> {
    const result = await this.chucVuRepository.query(
      SP_GET_DATA('ChucVus', `'MaCV = ${id}'`, 'MaCV', 0, 1),
    );
    return result[0];
  }

  async createChucVu(chucVu: string, user: any): Promise<ChucVu> {
    const result = await this.chucVuRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'", //string thuan
        'ChucVus',
        'ChucVu',
        `N' ${this.chucVu_DataInput(chucVu).ChucVu}'`, //string thuan
        "'MaCV = SCOPE_IDENTITY()'", //string thuan
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaCV: ${result[0].MaCV};`,
      TableName: 'ChucVus',
    });
    return result[0];
  }

  async editChucVu(chucVu: string, id: number, user: any): Promise<ChucVu> {
    const result = await this.chucVuRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'ChucVus',
        null,
        null,
        null,
        `N' ChucVu = ${this.chucVu_DataInput(chucVu).ChucVu}'`,
        `'MaCV = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaCV: ${result[0].MaCV};`,
      TableName: 'ChucVus',
    });
    return result[0];
  }

  async deleteChucVu(id: number, user: any): Promise<ChucVu> {
    const result = await this.chucVuRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'ChucVus',
        null,
        null,
        null,
        null,
        `'MaCV = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaCV: ${result[0].MaCV};`,
      TableName: 'ChucVus',
    });
    return result[0];
  }

  // ResolveField

  CBCSs(MaCV: number): Promise<CBCS[]> {
    return this.chucVuRepository.query(
      SP_GET_DATA_DECRYPT('CBCSs', `'MaCV = ${MaCV}'`, 0, 0),
    );
  }
}
