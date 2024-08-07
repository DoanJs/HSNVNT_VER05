import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import {
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { TonGiao } from './TonGiao.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';

@Injectable()
export class TonGiaosService {
  constructor(
    @InjectRepository(TonGiao) private tongiaoRepository: Repository<TonGiao>,
    private readonly actionDBsService: ActionDBsService
  ) {}

  public readonly tonGiao_DataInput = (tenTG: string) => {
    return {
      TenTG: tenTG ? `N''${tenTG}''` : null,
    };
  };

  tonGiaos(utilsParams: UtilsParamsInput): Promise<TonGiao[]> {
    return this.tongiaoRepository.query(
      SP_GET_DATA(
        'TonGiaos',
        "'MaTG != 0'",
        'MaTG',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async tonGiao(id: number): Promise<TonGiao> {
    const result = await this.tongiaoRepository.query(
      SP_GET_DATA('TonGiaos', `'MaTG = ${id}'`, 'MaTG', 0, 1),
    );
    return result[0];
  }

  async createTonGiao(tenTG: string, user: any): Promise<TonGiao> {
    const result = await this.tongiaoRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'TonGiaos',
        'TenTG',
        `N' ${this.tonGiao_DataInput(tenTG).TenTG}'`,
        "'MaTG = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaTG: ${result[0].MaTG};`,
      TableName: 'TonGiaos',
    });
    return result[0];
  }

  async editTonGiao(tenTG: string, id: number, user: any): Promise<TonGiao> {
    const result = await this.tongiaoRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'TonGiaos',
        null,
        null,
        null,
        `N' TenTG = ${this.tonGiao_DataInput(tenTG).TenTG}'`,
        `'MaTG = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaTG: ${result[0].MaTG};`,
      TableName: 'TonGiaos',
    });
    return result[0];
  }

  async deleteTonGiao(id: number, user: any): Promise<TonGiao> {
    const result = await this.tongiaoRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'TonGiaos',
        null,
        null,
        null,
        null,
        `'MaTG = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaTG: ${result[0].MaTG};`,
      TableName: 'TonGiaos',
    });
    return result[0];
  }

  // ResolveField

  DoiTuongs(MaTG: number): Promise<DoiTuong[]> {
    return this.tongiaoRepository.query(
      SP_GET_DATA_DECRYPT('DoiTuongs', `'MaTG = ${MaTG}'`, 0, 0),
    );
  }

  CBCSs(MaTG: number): Promise<CBCS[]> {
    return this.tongiaoRepository.query(
      SP_GET_DATA_DECRYPT('CBCSs', `'MaTG = ${MaTG}'`, 0, 0),
    );
  }
}
