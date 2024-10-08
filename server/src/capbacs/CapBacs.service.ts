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
import { CapBac } from './CapBac.model';

@Injectable()
export class CapBacsService {
  constructor(
    @InjectRepository(CapBac) private capbacRepository: Repository<CapBac>,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly capBac_DataInput = (capBac: string) => {
    return capBac ? `N''${capBac}''` : null;
  };

  async capbacs(utilsParams: UtilsParamsInput): Promise<CapBac[]> {
    
    return await this.capbacRepository.query(
      SP_GET_DATA(
        'CapBacs',
        `'MaCB != 0'`,
        'MaCB',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async capbac(id: number): Promise<CapBac> {
    const result = await this.capbacRepository.query(
      SP_GET_DATA('CapBacs', `'MaCB = ${id}'`, 'MaCB', 0, 1),
    );
    return result[0];
  }

  async createCapBac(capBac: string, user: any): Promise<CapBac> {
    const result = await this.capbacRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'", //string thuan
        'CapBacs',
        'CapBac',
        `N'${this.capBac_DataInput(capBac)}'`, //string thuan
        "'MaCB = SCOPE_IDENTITY()'", //string thuan
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaCB = ${result[0].MaCB}`,
      TableName: 'CapBacs',
    });
    return result[0];
  }

  async editCapBac(capBac: string, id: number, user: any): Promise<CapBac> {
    const result = await this.capbacRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'CapBacs',
        null,
        null,
        null,
        `N'CapBac = ${this.capBac_DataInput(capBac)}'`,
        `"MaCB = ${id}"`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaCB: ${result[0].MaCB}; CapBac: ${capBac}`,
      TableName: 'CapBacs',
    });
    return result[0];
  }

  async deleteCapBac(id: number, user: any): Promise<CapBac> {
    const result = await this.capbacRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'CapBacs',
        null,
        null,
        null,
        null,
        `"MaCB = ${id}"`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaCB: ${result[0].MaCB};`,
      TableName: 'CapBacs',
    });
    return result[0];
  }

  // ResolverField
  CBCSs(MaCB: number): Promise<[CBCS]> {
    return this.capbacRepository.query(
      SP_GET_DATA_DECRYPT('CBCSs', `'MaCB = ${MaCB}'`, 0, 0),
    );
  }
}
