import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { Doi } from 'src/dois/Doi.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { TinhTP } from 'src/tinhTPs/TinhTP.model';
import {
  SP_CHANGE_DATA,
  SP_CHANGE_QUYETDINHTSNT,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { QuyetDinhTSNT } from './QuyetDinhTSNT.model';
import { QuyetDinhTSNTInput } from './type/QuyetDinhTSNT.input';
import { QuyetDinhTSNT_TinhTPInput } from './type/QuyetDinhTSNT_TinhTP.input';
import { QuyetDinhTSNT_TinhTPType } from './type/QuyetDinhTSNT_TinhTP.type';

@Injectable()
export class QuyetDinhTSNTsService {
  constructor(
    @InjectRepository(QuyetDinhTSNT)
    private quyetdinhTSNTRepository: Repository<QuyetDinhTSNT>,
    private dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}
  public readonly quyetdinhTSNT_DataInput = (
    Type: string,
    MaQD: number | null,
    quyetdinhTSNTInput: QuyetDinhTSNTInput,
  ) => {
    return {
      Type,
      MaQD,
      QuyetDinhTSNTInput: {
        So: quyetdinhTSNTInput.So ? `N'${quyetdinhTSNTInput.So}'` : null,
        Ngay: quyetdinhTSNTInput.Ngay ? `N'${quyetdinhTSNTInput.Ngay}'` : null,
        BiDanh: quyetdinhTSNTInput.BiDanh
          ? `N'${quyetdinhTSNTInput.BiDanh}'`
          : null,
        ThoiGianBD: quyetdinhTSNTInput.ThoiGianBD
          ? `N'${quyetdinhTSNTInput.ThoiGianBD}'`
          : null,
        ThoiGianKT: quyetdinhTSNTInput.ThoiGianKT
          ? `N'${quyetdinhTSNTInput.ThoiGianKT}'`
          : null,
        NhiemVuCT: `N'${quyetdinhTSNTInput.NhiemVuCT}'`, // crypto
        MaDN: quyetdinhTSNTInput.MaDN ? quyetdinhTSNTInput.MaDN : null,
        MaLanhDaoPD: quyetdinhTSNTInput.MaLanhDaoPD
          ? quyetdinhTSNTInput.MaLanhDaoPD
          : null,
        MaDoi: quyetdinhTSNTInput.MaDoi ? quyetdinhTSNTInput.MaDoi : null,
      },
    };
  };

  quyetdinhTSNTs(utilsParams: UtilsParamsInput): Promise<QuyetDinhTSNT[]> {
    return this.quyetdinhTSNTRepository.query(
      SP_GET_DATA_DECRYPT(
        'QuyetDinhTSNTs',
        "'MaQD != 0'",
        utilsParams.skip && utilsParams.skip > 0 ? utilsParams.skip : 0,
        utilsParams.take && utilsParams.take > 0 ? utilsParams.take : 0,
      ),
    );
  }

  async quyetdinhTSNT(id: number): Promise<QuyetDinhTSNT> {
    const result = await this.quyetdinhTSNTRepository.query(
      SP_GET_DATA_DECRYPT('QuyetDinhTSNTs', `'MaQD = ${id}'`, 0, 1),
    );
    return result[0];
  }

  async createQuyetDinhTSNT(
    quyetdinhTSNTInput: QuyetDinhTSNTInput,
    user: any,
  ): Promise<QuyetDinhTSNT> {
    const result = await this.quyetdinhTSNTRepository.query(
      SP_CHANGE_QUYETDINHTSNT(
        this.quyetdinhTSNT_DataInput('CREATE', null, quyetdinhTSNTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaQD: ${result[0].MaQD};`,
      TableName: 'QuyetDinhTSNTs',
    });
    return result[0];
  }

  async editQuyetDinhTSNT(
    quyetdinhTSNTInput: QuyetDinhTSNTInput,
    id: number,
    user: any,
  ): Promise<QuyetDinhTSNT> {
    const result = await this.quyetdinhTSNTRepository.query(
      SP_CHANGE_QUYETDINHTSNT(
        this.quyetdinhTSNT_DataInput('EDIT', id, quyetdinhTSNTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaQD: ${result[0].MaQD};`,
      TableName: 'QuyetDinhTSNTs',
    });
    return result[0];
  }

  async deleteQuyetDinhTSNT(
    quyetdinhTSNTInput: QuyetDinhTSNTInput,
    id: number,
    user: any,
  ): Promise<QuyetDinhTSNT> {
    const result = await this.quyetdinhTSNTRepository.query(
      SP_CHANGE_QUYETDINHTSNT(
        this.quyetdinhTSNT_DataInput('DELETE', id, quyetdinhTSNTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaQD: ${result[0].MaQD};`,
      TableName: 'QuyetDinhTSNTs',
    });
    return result[0];
  }

  // many-to-many relation

  async quyetdinhTSNTs_tinhTPs(
    utilsParams: UtilsParamsInput,
  ): Promise<QuyetDinhTSNT_TinhTPType[]> {
    return this.quyetdinhTSNTRepository.query(
      SP_GET_DATA(
        'QuyetDinhTSNTs_TinhTPs',
        `'MaQD != 0'`,
        'MaQD',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async createQuyetDinhTSNT_TinhTP(
    quyetdinhtsnt_tinhtpInput: QuyetDinhTSNT_TinhTPInput,
    user: any,
  ): Promise<QuyetDinhTSNT_TinhTPType> {
    const result = await this.quyetdinhTSNTRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'QuyetDinhTSNTs_TinhTPs',
        `'MaTinhTP, MaQD'`,
        `'  ${quyetdinhtsnt_tinhtpInput.MaTinhTP},
            ${quyetdinhtsnt_tinhtpInput.MaQD}
        '`,
        `'MaTinhTP = ${quyetdinhtsnt_tinhtpInput.MaTinhTP}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `{ MaTinhTP: ${quyetdinhtsnt_tinhtpInput.MaTinhTP}, MaQD: ${quyetdinhtsnt_tinhtpInput.MaQD} };`,
      TableName: 'QuyetDinhTSNTs_TinhTPs',
    });
    return result[0];
  }

  async editQuyetDinhTSNT_TinhTP(
    quyetdinhtsnt_tinhtpInput: QuyetDinhTSNT_TinhTPInput,
    MaTinhTP: number,
    MaQD: number,
    user: any,
  ): Promise<QuyetDinhTSNT_TinhTPType> {
    await this.quyetdinhTSNTRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'QuyetDinhTSNTs_TinhTPs',
        null,
        null,
        null,
        `'  MaTinhTP = ${quyetdinhtsnt_tinhtpInput.MaTinhTP},
            MaQD = ${quyetdinhtsnt_tinhtpInput.MaQD}
        '`,
        `'MaTinhTP = ${MaTinhTP} AND MaQD = ${MaQD}'`,
      ),
    );
    const result = await this.quyetdinhTSNTRepository.query(
      SP_GET_DATA(
        'QuyetDinhTSNTs_TinhTPs',
        `'MaTinhTP = ${quyetdinhtsnt_tinhtpInput.MaTinhTP} AND MaQD = ${quyetdinhtsnt_tinhtpInput.MaQD}'`,
        'MaTinhTP',
        0,
        0,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `{ MaTinhTP: ${quyetdinhtsnt_tinhtpInput.MaTinhTP}, MaQD: ${quyetdinhtsnt_tinhtpInput.MaQD} };`,
      TableName: 'QuyetDinhTSNTs_TinhTPs',
    });
    return result[0];
  }

  async deleteQuyetDinhTSNT_TinhTP(
    MaTinhTP: number,
    MaQD: number,
    user: any,
  ): Promise<QuyetDinhTSNT_TinhTPType> {
    const result = await this.quyetdinhTSNTRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'QuyetDinhTSNTs_TinhTPs',
        null,
        null,
        null,
        null,
        `'MaTinhTP = ${MaTinhTP} AND MaQD = ${MaQD}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `{ MaTinhTP: ${MaTinhTP}, MaQD: ${MaQD} };`,
      TableName: 'QuyetDinhTSNTs_TinhTPs',
    });
    return result[0];
  }

  // ResolveField

  async DeNghiTSNT(quyetdinhTSNT: any): Promise<DeNghiTSNT> {
    const result = await this.quyetdinhTSNTRepository.query(
      SP_GET_DATA_DECRYPT(
        'DeNghiTSNTs',
        `'MaDN = ${quyetdinhTSNT.MaDN}'`,
        0,
        1,
      ),
    );
    return result[0];
  }

  async Doi(quyetdinhTSNT: any): Promise<Doi> {
    if (quyetdinhTSNT.MaDoi) {
      return this.dataloaderService.loaderDoi.load(quyetdinhTSNT.MaDoi);
    }
  }

  async LanhDaoPD(quyetdinhTSNT: any): Promise<CBCS> {
    if (quyetdinhTSNT.MaLanhDaoPD) {
      return this.dataloaderService.loaderCBCS.load(quyetdinhTSNT.MaLanhDaoPD);
    }
  }

  async PhamViTSs(MaQD: number): Promise<TinhTP[]> {
    const result = (await this.quyetdinhTSNTRepository.query(
      SP_GET_DATA(
        'QuyetDinhTSNTs_TinhTPs',
        `'MaQD = ${MaQD}'`,
        'MaTinhTP',
        0,
        0,
      ),
    )) as [{ MaTinhTP: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderTinhTP.load(obj.MaTinhTP),
    );
    return await Promise.all(resultLoader);
  }

  async KeHoachTSNT(MaQD: number): Promise<KeHoachTSNT> {
    const result = await this.quyetdinhTSNTRepository.query(
      SP_GET_DATA_DECRYPT('KeHoachTSNTs', `'MaQD = ${MaQD}'`, 0, 1),
    );
    return result[0];
  }
}
