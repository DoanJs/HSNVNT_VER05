import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { SP_CHANGE_DATA, SP_GET_DATA } from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { CapCA } from './CapCA.model';

@Injectable()
export class CapCAsService {
  constructor(
    @InjectRepository(CapCA) private capCARepository: Repository<CapCA>,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly capCA_DataInput = (capCA: string) => {
    return capCA ? `N''${capCA}''` : null;
  };

  async capCAs(utilsParams: UtilsParamsInput): Promise<CapCA[]> {
    return await this.capCARepository.query(
      SP_GET_DATA(
        'CapCAs',
        `'MaCapCA != 0'`,
        'MaCapCA',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async capCA(id: number): Promise<CapCA> {
    const result = await this.capCARepository.query(
      SP_GET_DATA('CapCAs', `'MaCapCA = ${id}'`, 'MaCapCA', 0, 1),
    );
    return result[0];
  }

  async createCapCA(capCA: string, user: any): Promise<CapCA> {
    const result = await this.capCARepository.query(
      SP_CHANGE_DATA(
        "'CREATE'", //string thuan
        'CapCAs',
        'CapCA',
        `N'${this.capCA_DataInput(capCA)}'`, //string thuan
        "'MaCapCA = SCOPE_IDENTITY()'", //string thuan
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaCapCA: ${result[0].MaCapCA};`,
      TableName: 'CapCAs',
    });
    return result[0];
  }

  async editCapCA(capCA: string, id: number, user: any): Promise<CapCA> {
    const result = await this.capCARepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'CapCAs',
        null,
        null,
        null,
        `N'CapCA = ${this.capCA_DataInput(capCA)}'`,
        `'MaCapCA = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaCapCA: ${result[0].MaCapCA};`,
      TableName: 'CapCAs',
    });
    return result[0];
  }

  async deleteCapCA(id: number, user: any): Promise<CapCA> {
    const result = await this.capCARepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'CapCAs',
        null,
        null,
        null,
        null,
        `"MaCapCA = ${id}"`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaCapCA: ${result[0].MaCapCA};`,
      TableName: 'CapCAs',
    });
    return result[0];
  }

  // ResolveField
  async CATTPvaTDs(MaCapCA: number): Promise<CATTPvaTD[]> {
    return await this.capCARepository.query(
      SP_GET_DATA('CATTPvaTDs', `MaCapCA = ${MaCapCA}`, 'MaCATTPvaTD', 0, 0),
    );
  }

  async CAQHvaTDs(MaCapCA: number): Promise<CAQHvaTD[]> {
    return await this.capCARepository.query(
      SP_GET_DATA('CAQHvaTDs', `MaCapCA = ${MaCapCA}`, 'MaCAQHvaTD', 0, 0),
    );
  }
}
