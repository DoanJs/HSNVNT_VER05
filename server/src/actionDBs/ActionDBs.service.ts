import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SP_CHANGE_DATA, SP_GET_DATA } from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { ActionDB } from './ActionDB.model';
import { ActionDBInput } from './type/ActionDB.input';
import * as moment from 'moment';

@Injectable()
export class ActionDBsService {
  constructor(
    @InjectRepository(ActionDB)
    private actionDBsRepository: Repository<ActionDB>,
  ) {}

  public readonly actionDB_DataInput = (actionDBInput: ActionDBInput) => {
    return {
      MaHistory: actionDBInput.MaHistory ? actionDBInput.MaHistory : null,
      TableName: actionDBInput.TableName
        ? `N''${actionDBInput.TableName}''`
        : null,
      Action: actionDBInput.Action ? `N''${actionDBInput.Action}''` : null,
      Time: `N''${moment().format()}''`,
      Other: actionDBInput.Other ? `N''${actionDBInput.Other}''` : null,
    };
  };

  async actionDBs(utilsParams: UtilsParamsInput): Promise<ActionDB[]> {
    return await this.actionDBsRepository.query(
      SP_GET_DATA(
        'ActionDBs',
        `'MaActionDB != 0'`,
        'MaActionDB',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async actionDB(id: number): Promise<ActionDB> {
    const result = await this.actionDBsRepository.query(
      SP_GET_DATA('ActionDBs', `'MaActionDB = ${id}'`, 'MaActionDB', 0, 1),
    );
    return result[0];
  }

  async createActionDB(actionDBInput: ActionDBInput): Promise<ActionDB> {
    const result = await this.actionDBsRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'", //string thuan
        'ActionDBs',
        `'MaHistory, TableName, Action, Time, Other'`,
        `N' ${this.actionDB_DataInput(actionDBInput).MaHistory},
            ${this.actionDB_DataInput(actionDBInput).TableName},
            ${this.actionDB_DataInput(actionDBInput).Action},
            ${this.actionDB_DataInput(actionDBInput).Time},
            ${this.actionDB_DataInput(actionDBInput).Other}
        '`, //string thuan
        `'MaActionDB = SCOPE_IDENTITY()'`, //string thuan
      ),
    );
    return result[0];
  }

  async editActionDB(
    actionDBInput: ActionDBInput,
    id: number,
  ): Promise<ActionDB> {
    const result = await this.actionDBsRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'ActionDBs',
        null,
        null,
        null,
        `N' MaHistory = ${this.actionDB_DataInput(actionDBInput).MaHistory},
            TableName = ${this.actionDB_DataInput(actionDBInput).TableName},
            Action = ${this.actionDB_DataInput(actionDBInput).Action},
            Time = ${this.actionDB_DataInput(actionDBInput).Time},
            Other = ${this.actionDB_DataInput(actionDBInput).Other}
        '`,
        `'MaActionDB = ${id}'`,
      ),
    );
    return result[0];
  }

  async deleteActionDB(id: number): Promise<ActionDB> {
    const result = await this.actionDBsRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'ActionDBs',
        null,
        null,
        null,
        null,
        `"MaActionDB = ${id}"`,
      ),
    );
    return result[0];
  }

  // ResolverField
  // History
}
