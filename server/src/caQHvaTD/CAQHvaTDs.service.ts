import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BaoCaoKQXMDiaChi } from 'src/baocaoKQXMDiaChis/BaoCaoKQXMDiaChi.model';
import { BaoCaoKQXMQuanHe } from 'src/baocaoKQXMQuanHes/BaoCaoKQXMQuanHe.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { Doi } from 'src/dois/Doi.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import {
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { CAQHvaTD } from './CAQHvaTD.model';
import { CAQHvaTDInput } from './type/CAQHvaTD.Input';
import { CapCA } from 'src/capCAs/CapCA.model';

@Injectable()
export class CAQHvaTDsService {
  constructor(
    @InjectRepository(CAQHvaTD)
    private caQHvaTDRepository: Repository<CAQHvaTD>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly caQHvaTD_DataInput = (caQHvaTDInput: CAQHvaTDInput) => {
    return {
      CAQHvaTD: caQHvaTDInput.CAQHvaTD
        ? `N''${caQHvaTDInput.CAQHvaTD}''`
        : null,
      KyHieu: caQHvaTDInput.KyHieu ? `N''${caQHvaTDInput.KyHieu}''` : null,
      MaCATTPvaTD: caQHvaTDInput.MaCATTPvaTD ? caQHvaTDInput.MaCATTPvaTD : null,
      MaCapCA: caQHvaTDInput.MaCapCA ? caQHvaTDInput.MaCapCA : null,
    };
  };

  async caQHvaTDs(utilsParams: UtilsParamsInput): Promise<CAQHvaTD[]> {
    return await this.caQHvaTDRepository.query(
      SP_GET_DATA(
        'CAQHvaTDs',
        `'MaCAQHvaTD != 0'`,
        'MaCAQHvaTD',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async caQHvaTD(id: number): Promise<CAQHvaTD> {
    const result = await this.caQHvaTDRepository.query(
      SP_GET_DATA('CAQHvaTDs', `'MaCAQHvaTD = ${id}'`, 'MaCAQHvaTD', 0, 1),
    );
    return result[0];
  }

  async createCAQHvaTD(
    caQHvaTDInput: CAQHvaTDInput,
    user: any,
  ): Promise<CAQHvaTD> {
    const result = await this.caQHvaTDRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'CAQHvaTDs',
        '"CAQHvaTD, KyHieu, MaCATTPvaTD, MaCapCA"',
        `N'${this.caQHvaTD_DataInput(caQHvaTDInput).CAQHvaTD},
        ${this.caQHvaTD_DataInput(caQHvaTDInput).KyHieu},
         ${this.caQHvaTD_DataInput(caQHvaTDInput).MaCATTPvaTD},
         ${this.caQHvaTD_DataInput(caQHvaTDInput).MaCapCA}
         '`,
        "'MaCAQHvaTD = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaCAQHvaTD: ${result[0].MaCAQHvaTD};`,
      TableName: 'CAQHvaTDs',
    });
    return result[0];
  }

  async editCAQHvaTD(
    caQHvaTDInput: CAQHvaTDInput,
    id: number,
    user: any,
  ): Promise<CAQHvaTD> {
    const result = await this.caQHvaTDRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'CAQHvaTDs',
        null,
        null,
        null,
        `N'CAQHvaTD = ${this.caQHvaTD_DataInput(caQHvaTDInput).CAQHvaTD},
          KyHieu = ${this.caQHvaTD_DataInput(caQHvaTDInput).KyHieu},
          MaCATTPvaTD = ${this.caQHvaTD_DataInput(caQHvaTDInput).MaCATTPvaTD},
          MaCapCA = ${this.caQHvaTD_DataInput(caQHvaTDInput).MaCapCA}
        '`,
        `"MaCAQHvaTD = ${id}"`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaCAQHvaTD: ${result[0].MaCAQHvaTD};`,
      TableName: 'CAQHvaTDs',
    });
    return result[0];
  }

  async deleteCAQHvaTD(id: number, user: any): Promise<CAQHvaTD> {
    const result = await this.caQHvaTDRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'CAQHvaTDs',
        null,
        null,
        null,
        null,
        `"MaCAQHvaTD = ${id}"`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaCAQHvaTD: ${result[0].MaCAQHvaTD};`,
      TableName: 'CAQHvaTDs',
    });
    return result[0];
  }

  // ResolveField

  async CATTPvaTD(caQHvaTD: any): Promise<CATTPvaTD> {
    if (caQHvaTD.MaCATTPvaTD) {
      return this.dataloaderService.loaderCATTPvaTD.load(caQHvaTD.MaCATTPvaTD);
    }
  }

  async CapCA(caQHvaTD: any): Promise<CapCA> {
    if (caQHvaTD.MaCapCA) {
      return this.dataloaderService.loaderCapCA.load(caQHvaTD.MaCapCA);
    }
  }

  DeNghiTSNTs(MaDV: number): Promise<DeNghiTSNT[]> {
    return this.caQHvaTDRepository.query(
      SP_GET_DATA_DECRYPT('DeNghiTSNTs', `'MaDV = ${MaDV}'`, 0, 0),
    );
  }

  async Dois(MaCAQHvaTD: number): Promise<Doi[]> {
    return await this.caQHvaTDRepository.query(
      SP_GET_DATA('Dois', `'MaCAQHvaTD = ${MaCAQHvaTD}'`, 'MaDoi', 0, 0),
    );
  }
}
