import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { DanToc } from 'src/dantocs/DanToc.model';
import { SP_CHANGE_DATA, SP_GET_DATA } from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { QuocTich } from './QuocTich.model';

@Injectable()
export class QuocTichsService {
  constructor(
    @InjectRepository(QuocTich)
    private quoctichRepository: Repository<QuocTich>,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly quocTich_DataInput = (tenQT: string) => {
    return {
      TenQT: tenQT ? `N''${tenQT}''` : null,
    };
  };

  quocTichs(utilsParams: UtilsParamsInput): Promise<QuocTich[]> {
    return this.quoctichRepository.query(
      SP_GET_DATA(
        'QuocTichs',
        "'MaQT != 0'",
        'MaQT',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async quocTich(id: number): Promise<QuocTich> {
    const result = await this.quoctichRepository.query(
      SP_GET_DATA('QuocTichs', `'MaQT = ${id}'`, 'MaQT', 0, 1),
    );
    return result[0];
  }

  async createQuocTich(tenQT: string, user: any): Promise<QuocTich> {
    const result = await this.quoctichRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'QuocTichs',
        'TenQT',
        `N' ${this.quocTich_DataInput(tenQT).TenQT}'`,
        "'MaQT = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaQT: ${result[0].MaQT};`,
      TableName: 'QuocTichs',
    });
    return result[0];
  }

  async editQuocTich(tenQT: string, id: number, user: any): Promise<QuocTich> {
    const result = await this.quoctichRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'QuocTichs',
        null,
        null,
        null,
        `N' TenQT = ${this.quocTich_DataInput(tenQT).TenQT}'`,
        `'MaQT = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaQT: ${result[0].MaQT};`,
      TableName: 'QuocTichs',
    });
    return result[0];
  }

  async deleteQuocTich(id: number, user: any): Promise<QuocTich> {
    const result = await this.quoctichRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'QuocTichs',
        null,
        null,
        null,
        null,
        `"MaQT = ${id}"`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaQT: ${result[0].MaQT};`,
      TableName: 'QuocTichs',
    });
    return result[0];
  }

  // ResolveField

  async DanTocs(MaQT: number): Promise<DanToc[]> {
    return await this.quoctichRepository.query(
      SP_GET_DATA('DanTocs', `'MaQT = ${MaQT}'`, 'MaDT', 0, 0),
    );
  }
}
