import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { SP_CHANGE_TRAMCT, SP_GET_DATA_DECRYPT } from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { TramCT } from './TramCT.model';
import { TramCTInput } from './type/TramCT.input';

@Injectable()
export class TramCTsService {
  constructor(
    @InjectRepository(TramCT)
    private tramCTRepository: Repository<TramCT>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}
  public readonly tramCT_DataInput = (
    Type: string,
    MaTramCT: number | null,
    tramCTInput: TramCTInput,
  ) => {
    return {
      Type,
      MaTramCT,
      TramCTInput: {
        Ngay: tramCTInput.Ngay ? `N'${tramCTInput.Ngay}'` : null,
        DiaDiem: `N'${tramCTInput.DiaDiem}'`, // crypto
        TinhHinhDB: tramCTInput.TinhHinhDB
          ? `N'${tramCTInput.TinhHinhDB}'`
          : null,
        LyLichTram: `N'${tramCTInput.LyLichTram}'`, // crypto
        SoDoTram: `N'${tramCTInput.SoDoTram}'`, // crypto
        VanDeChuY: tramCTInput.VanDeChuY ? `N'${tramCTInput.VanDeChuY}'` : null,
        QuyDinh: tramCTInput.QuyDinh ? `N'${tramCTInput.QuyDinh}'` : null,
        MaTSXayDung: tramCTInput.MaTSXayDung ? tramCTInput.MaTSXayDung : null,
        MaLanhDaoPD: tramCTInput.MaLanhDaoPD ? tramCTInput.MaLanhDaoPD : null,
      },
    };
  };

  async tramCTs(utilsParams: UtilsParamsInput): Promise<TramCT[]> {
    return this.tramCTRepository.query(
      SP_GET_DATA_DECRYPT(
        'TramCTs',
        "'MaTramCT != 0'",
        utilsParams.skip && utilsParams.skip > 0 ? utilsParams.skip : 0,
        utilsParams.take && utilsParams.take > 0 ? utilsParams.take : 0,
      ),
    );
  }

  async tramCT(id: number): Promise<TramCT> {
    const result = await this.tramCTRepository.query(
      SP_GET_DATA_DECRYPT('TramCTs', `"MaTramCT = ${id}"`, 0, 1),
    );
    return result[0];
  }

  async createTramCT(tramCTInput: TramCTInput, user: any): Promise<TramCT> {
    const result = await this.tramCTRepository.query(
      SP_CHANGE_TRAMCT(this.tramCT_DataInput('CREATE', null, tramCTInput)),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaTramCT: ${result[0].MaTramCT};`,
      TableName: 'TramCTs',
    });
    return result[0];
  }

  async editTramCT(
    tramCTInput: TramCTInput,
    id: number,
    user: any,
  ): Promise<TramCT> {
    const result = await this.tramCTRepository.query(
      SP_CHANGE_TRAMCT(this.tramCT_DataInput('EDIT', id, tramCTInput)),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaTramCT: ${result[0].MaTramCT};`,
      TableName: 'TramCTs',
    });
    return result[0];
  }

  async deleteTramCT(
    tramCTInput: TramCTInput,
    id: number,
    user: any,
  ): Promise<TramCT> {
    const result = await this.tramCTRepository.query(
      SP_CHANGE_TRAMCT(this.tramCT_DataInput('DELETE', id, tramCTInput)),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaTramCT: ${result[0].MaTramCT};`,
      TableName: 'TramCTs',
    });
    return result[0];
  }

  // ResolveField

  async TSXayDung(tramCT: any): Promise<CBCS> {
    if (tramCT.MaTSXayDung) {
      return this.dataloaderService.loaderCBCS.load(tramCT.MaTSXayDung);
    }
  }

  async LanhDaoPD(tramCT: any): Promise<CBCS> {
    if (tramCT.MaLanhDaoPD) {
      return this.dataloaderService.loaderCBCS.load(tramCT.MaLanhDaoPD);
    }
  }

  KeHoachTSNTs(MaTramCT: number): Promise<KeHoachTSNT[]> {
    return this.tramCTRepository.query(
      SP_GET_DATA_DECRYPT('KeHoachTSNTs', `'MaTramCT = ${MaTramCT}'`, 0, 0),
    );
  }
}
