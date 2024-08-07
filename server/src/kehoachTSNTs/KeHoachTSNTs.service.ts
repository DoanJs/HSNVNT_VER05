import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { LLDB } from 'src/lldbs/LLDB.model';
import { LucLuongThamGiaKH } from 'src/lltgKeHoachs/LucLuongThamGiaKH.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import {
  SP_CHANGE_DATA,
  SP_CHANGE_KEHOACHTSNT,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { KeHoachTSNT } from './KeHoachTSNT.model';
import { KeHoachTSNTInput } from './type/KeHoachTSNT.input';
import { KeHoachTSNT_LLDBInput } from './type/KeHoachTSNT_LLDB.input';
import { KeHoachTSNT_LLDBType } from './type/KeHoachTSNT_LLDB.type';

@Injectable()
export class KeHoachTSNTsService {
  constructor(
    @InjectRepository(KeHoachTSNT)
    private kehoachTSNTRepository: Repository<KeHoachTSNT>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}
  public readonly kehoachTSNT_DataInput = (
    Type: string,
    MaKH: number | null,
    kehoachTSNTInput: KeHoachTSNTInput,
  ) => {
    return {
      Type,
      MaKH,
      KeHoachTSNTInput: {
        So: kehoachTSNTInput.So ? `N'${kehoachTSNTInput.So}'` : null,
        Ngay: kehoachTSNTInput.Ngay ? `N'${kehoachTSNTInput.Ngay}'` : null,
        VanDeChuY: `N'${kehoachTSNTInput.VanDeChuY}'`, // crypto
        NoiDung: `N'${kehoachTSNTInput.NoiDung}'`, // crypto
        MaQD: kehoachTSNTInput.MaQD ? kehoachTSNTInput.MaQD : null,
        MaTramCT: kehoachTSNTInput.MaTramCT ? kehoachTSNTInput.MaTramCT : null,
        MaLanhDaoPD: kehoachTSNTInput.MaLanhDaoPD
          ? kehoachTSNTInput.MaLanhDaoPD
          : null,
        MaBCHPhuTrach: kehoachTSNTInput.MaBCHPhuTrach
          ? kehoachTSNTInput.MaBCHPhuTrach
          : null,
      },
    };
  };

  kehoachTSNTs(utilsParams: UtilsParamsInput): Promise<KeHoachTSNT[]> {
    return this.kehoachTSNTRepository.query(
      SP_GET_DATA_DECRYPT(
        'KeHoachTSNTs',
        "'MaKH != 0'",
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async kehoachTSNT(id: number): Promise<KeHoachTSNT> {
    const result = await this.kehoachTSNTRepository.query(
      SP_GET_DATA_DECRYPT('KeHoachTSNTs', `'MaKH = ${id}'`, 0, 1),
    );
    return result[0];
  }

  async createKeHoachTSNT(
    kehoachTSNTInput: KeHoachTSNTInput,
    user: any,
  ): Promise<KeHoachTSNT> {
    const result = await this.kehoachTSNTRepository.query(
      SP_CHANGE_KEHOACHTSNT(
        this.kehoachTSNT_DataInput('CREATE', null, kehoachTSNTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaKH: ${result[0].MaKH};`,
      TableName: 'KeHoachTSNTs',
    });
    return result[0];
  }

  async editKeHoachTSNT(
    kehoachTSNTInput: KeHoachTSNTInput,
    id: number,
    user: any,
  ): Promise<KeHoachTSNT> {
    const result = await this.kehoachTSNTRepository.query(
      SP_CHANGE_KEHOACHTSNT(
        this.kehoachTSNT_DataInput('EDIT', id, kehoachTSNTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaKH: ${result[0].MaKH};`,
      TableName: 'KeHoachTSNTs',
    });
    return result[0];
  }

  async deleteKeHoachTSNT(
    kehoachTSNTInput: KeHoachTSNTInput,
    id: number,
    user: any,
  ): Promise<KeHoachTSNT> {
    const result = await this.kehoachTSNTRepository.query(
      SP_CHANGE_KEHOACHTSNT(
        this.kehoachTSNT_DataInput('DELETE', id, kehoachTSNTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaKH: ${result[0].MaKH};`,
      TableName: 'KeHoachTSNTs',
    });
    return result[0];
  }
  // many-to-many relation

  async kehoachTSNTs_lldbs(
    utilsParams: UtilsParamsInput,
  ): Promise<KeHoachTSNT_LLDBType[]> {
    return this.kehoachTSNTRepository.query(
      SP_GET_DATA(
        'KeHoachTSNTs_LLDBs',
        `'MaKH != 0'`,
        'MaKH',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async createKeHoachTSNT_LLDB(
    kehoachtsnt_lldbInput: KeHoachTSNT_LLDBInput,
    user: any,
  ): Promise<KeHoachTSNT_LLDBType> {
    const result = await this.kehoachTSNTRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'KeHoachTSNTs_LLDBs',
        `'MaLLDB, MaKH'`,
        `'  ${kehoachtsnt_lldbInput.MaLLDB},
            ${kehoachtsnt_lldbInput.MaKH}
        '`,
        `'MaLLDB = ${kehoachtsnt_lldbInput.MaLLDB}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `{ MaLLDB: ${kehoachtsnt_lldbInput.MaLLDB}, MaKH: ${kehoachtsnt_lldbInput.MaKH} };`,
      TableName: 'KeHoachTSNTs_LLDBs',
    });
    return result[0];
  }

  async editKeHoachTSNT_LLDB(
    kehoachtsnt_lldbInput: KeHoachTSNT_LLDBInput,
    MaLLDB: number,
    MaKH: number,
    user: any,
  ): Promise<KeHoachTSNT_LLDBType> {
    await this.kehoachTSNTRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'KeHoachTSNTs_LLDBs',
        null,
        null,
        null,
        `'  MaLLDB = ${kehoachtsnt_lldbInput.MaLLDB},
            MaKH = ${kehoachtsnt_lldbInput.MaKH}
        '`,
        `'MaLLDB = ${MaLLDB} AND MaKH = ${MaKH}'`,
      ),
    );
    const result = await this.kehoachTSNTRepository.query(
      SP_GET_DATA(
        'KeHoachTSNTs_LLDBs',
        `'MaLLDB = ${kehoachtsnt_lldbInput.MaLLDB} AND MaKH = ${kehoachtsnt_lldbInput.MaKH}'`,
        'MaLLDB',
        0,
        0,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `{ MaLLDB: ${kehoachtsnt_lldbInput.MaLLDB}, MaKH: ${kehoachtsnt_lldbInput.MaKH} };`,
      TableName: 'KeHoachTSNTs_LLDBs',
    });
    return result[0];
  }

  async deleteKeHoachTSNT_LLDB(
    MaLLDB: number,
    MaKH: number,
    user: any,
  ): Promise<KeHoachTSNT_LLDBType> {
    const result = await this.kehoachTSNTRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'KeHoachTSNTs_LLDBs',
        null,
        null,
        null,
        null,
        `'MaLLDB = ${MaLLDB} AND MaKH = ${MaKH}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `{ MaLLDB: ${MaLLDB}, MaKH: ${MaKH} };`,
      TableName: 'KeHoachTSNTs_LLDBs',
    });
    return result[0];
  }

  // ResolveField

  async QuyetDinhTSNT(kehoachTSNT: any): Promise<QuyetDinhTSNT> {
    const result = await this.kehoachTSNTRepository.query(
      SP_GET_DATA_DECRYPT(
        'QuyetDinhTSNTs',
        `'MaQD = ${kehoachTSNT.MaQD}'`,
        0,
        1,
      ),
    );
    return result[0];
  }

  async TramCT(kehoachTSNT: any): Promise<TramCT> {
    if (kehoachTSNT.MaTramCT) {
      return this.dataloaderService.loaderTramCT.load(kehoachTSNT.MaTramCT);
    }
  }

  async LanhDaoPD(kehoachTSNT: any): Promise<CBCS> {
    if (kehoachTSNT.MaLanhDaoPD) {
      return this.dataloaderService.loaderCBCS.load(kehoachTSNT.MaLanhDaoPD);
    }
  }

  async BCHPhuTrach(kehoachTSNT: any): Promise<CBCS> {
    if (kehoachTSNT.MaBCHPhuTrach) {
      return this.dataloaderService.loaderCBCS.load(kehoachTSNT.MaBCHPhuTrach);
    }
  }

  async LLDBs(MaKH: number): Promise<LLDB[]> {
    const result = (await this.kehoachTSNTRepository.query(
      SP_GET_DATA('KeHoachTSNTs_LLDBs', `'MaKH = ${MaKH}'`, 'MaKH', 0, 0),
    )) as [{ MaLLDB: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderLLDB.load(obj.MaLLDB),
    );
    return await Promise.all(resultLoader);
  }

  async LLTGKeHoachs(MaKH: number): Promise<LucLuongThamGiaKH[]> {
    return this.kehoachTSNTRepository.query(
      SP_GET_DATA('LucLuongThamGiaKHs', `'MaKH = ${MaKH}'`, 'MaLLTGKH', 0, 0),
    );
  }

  async KetQuaTSNT(MaKH: number): Promise<KetQuaTSNT> {
    const result = await this.kehoachTSNTRepository.query(
      SP_GET_DATA('KetQuaTSNTs', `'MaKH = ${MaKH}'`, 'MaKQ', 0, 0),
    );
    return result[0];
  }
}
