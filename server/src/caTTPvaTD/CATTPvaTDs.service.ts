import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CapCA } from 'src/capCAs/CapCA.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { SP_CHANGE_DATA, SP_GET_DATA } from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { CATTPvaTD } from './CATTPvaTD.model';
import { CATTPvaTDInput } from './type/CATTPvaTD.input';

@Injectable()
export class CATTPvaTDsService {
  constructor(
    @InjectRepository(CATTPvaTD)
    private caTTPvaTDRepository: Repository<CATTPvaTD>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly caTTPvaTD_DataInput = (caTTPvaTDInput: CATTPvaTDInput) => {
    return {
      CATTPvaTD: caTTPvaTDInput.CATTPvaTD
        ? `N''${caTTPvaTDInput.CATTPvaTD}''`
        : null,
      MaCapCA: caTTPvaTDInput.MaCapCA ? caTTPvaTDInput.MaCapCA : null,
    };
  };

  async caTTPvaTDs(utilsParams: UtilsParamsInput): Promise<CATTPvaTD[]> {
    return await this.caTTPvaTDRepository.query(
      SP_GET_DATA(
        'CATTPvaTDs',
        `'MaCATTPvaTD != 0'`,
        'MaCATTPvaTD',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async caTTPvaTD(id: number): Promise<CATTPvaTD> {
    const result = await this.caTTPvaTDRepository.query(
      SP_GET_DATA('CATTPvaTDs', `'MaCATTPvaTD = ${id}'`, 'MaCATTPvaTD', 0, 1),
    );
    return result[0];
  }

  async createCATTPvaTD(
    caTTPvaTDInput: CATTPvaTDInput,
    user: any,
  ): Promise<CATTPvaTD> {
    const result = await this.caTTPvaTDRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'CATTPvaTDs',
        "'CATTPvaTD, MaCapCA'",
        `N' ${this.caTTPvaTD_DataInput(caTTPvaTDInput).CATTPvaTD},
            ${this.caTTPvaTD_DataInput(caTTPvaTDInput).MaCapCA}
        '`,
        "'MaCATTPvaTD = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaCATTPvaTD: ${result[0].MaCATTPvaTD};`,
      TableName: 'CATTPvaTDs',
    });
    return result[0];
  }

  async editCATTPvaTD(
    caTTPvaTDInput: CATTPvaTDInput,
    id: number,
    user: any,
  ): Promise<CATTPvaTD> {
    const result = await this.caTTPvaTDRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'CATTPvaTDs',
        null,
        null,
        null,
        `N'CATTPvaTD = ${this.caTTPvaTD_DataInput(caTTPvaTDInput).CATTPvaTD},
          MaCapCA = ${this.caTTPvaTD_DataInput(caTTPvaTDInput).MaCapCA}
        '`,
        `"MaCATTPvaTD = ${id}"`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaCATTPvaTD: ${result[0].MaCATTPvaTD};`,
      TableName: 'CATTPvaTDs',
    });
    return result[0];
  }

  async deleteCATTPvaTD(id: number, user: any): Promise<CATTPvaTD> {
    const result = await this.caTTPvaTDRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'CATTPvaTDs',
        null,
        null,
        null,
        null,
        `"MaCATTPvaTD = ${id}"`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaCATTPvaTD: ${result[0].MaCATTPvaTD};`,
      TableName: 'CATTPvaTDs',
    });
    return result[0];
  }

  // ResolveField

  async CAQHvaTDs(MaCATTPvaTD: number): Promise<CAQHvaTD[]> {
    return await this.caTTPvaTDRepository.query(
      SP_GET_DATA(
        'CAQHvaTDs',
        `'MaCATTPvaTD = ${MaCATTPvaTD}'`,
        'MaCAQHvaTD',
        0,
        0,
      ),
    );
  }

  async CapCA(caTTPvaTD: any): Promise<CapCA> {
    if (caTTPvaTD.MaCapCA) {
      return this.dataloaderService.loaderCapCA.load(caTTPvaTD.MaCapCA);
    }
  }
}
