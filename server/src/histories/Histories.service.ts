import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SP_CHANGE_DATA,
  SP_GET_DATA
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { History } from './History.model';
import { HistoryInput } from './type/History.input';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(History) private historiesRepository: Repository<History>,
  ) {}

  public readonly history_DataInput = (historyInput: HistoryInput) => {
    return {
      AccountID: historyInput.AccountID ? historyInput.AccountID : null,
      TimeLogin: historyInput.TimeLogin? `N''${historyInput.TimeLogin}''` : null,
      TimeLogout: historyInput.TimeLogout? `N''${historyInput.TimeLogout}''` : null
    }
  };

  async histories(utilsParams: UtilsParamsInput): Promise<History[]> {
    return await this.historiesRepository.query(
      SP_GET_DATA(
        'Histories',
        `'MaHistory != 0'`,
        'MaHistory',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async history(id: number): Promise<History> {
    const result = await this.historiesRepository.query(
      SP_GET_DATA('Histories', `'MaHistory = ${id}'`, 'MaHistory', 0, 1),
    );
    return result[0];
  }

  async createHistory(historyInput: HistoryInput): Promise<History> {
    const result = await this.historiesRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'", //string thuan
        'Histories',
        `'AccountID, TimeLogin, TimeLogout'`,
        `N' ${this.history_DataInput(historyInput).AccountID},
            ${this.history_DataInput(historyInput).TimeLogin},
            ${this.history_DataInput(historyInput).TimeLogout}
        '`, //string thuan
        `'MaHistory = SCOPE_IDENTITY()'`, //string thuan
      ),
    );
    return result[0];
  }

  async editHistory(historyInput: HistoryInput, id: number): Promise<History> {
    const result = await this.historiesRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'Histories',
        null,
        null,
        null,
        `N' AccountID = ${this.history_DataInput(historyInput).AccountID},
            TimeLogin = ${this.history_DataInput(historyInput).TimeLogin},
            TimeLogout = ${this.history_DataInput(historyInput).TimeLogout}
        '`,
        `'MaHistory = ${id}'`,
      ),
    );
    return result[0];
  }

  async deleteHistory(id: number): Promise<History> {
    const result = await this.historiesRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'Histories',
        null,
        null,
        null,
        null,
        `"MaHistory = ${id}"`,
      ),
    );
    return result[0];
  }

  // ResolverField
}
