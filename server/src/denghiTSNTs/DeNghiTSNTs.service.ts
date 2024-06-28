import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { HinhThucHD } from 'src/hinhthucHDs/HinhThucHD.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TinhTP } from 'src/tinhTPs/TinhTP.model';
import {
  SP_CHANGE_DATA,
  SP_CHANGE_DENGHITSNT,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { DeNghiTSNT } from './DeNghiTSNT.model';
import { DeNghiTSNTInput } from './type/DeNghiTSNT.input';
import { DeNghiTSNT_TinhTPType } from './type/DeNghiTSNT_TinhTP.type';
import { DeNghiTSNT_TinhTPInput } from './type/DeNghiTSNT_TinhTP.input';
import { DauMoiPH_DN } from 'src/dauMoiPH_DNs/DauMoiPH_DN.model';

@Injectable()
export class DeNghiTSNTsService {
  constructor(
    @InjectRepository(DeNghiTSNT)
    private denghiTSNTRepository: Repository<DeNghiTSNT>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}
  public readonly denghiTSNT_DataInput = (
    Type: string,
    MaDN: number | null,
    denghiTSNTInput: DeNghiTSNTInput,
  ) => {
    return {
      Type,
      MaDN,
      DeNghiTSNTInput: {
        So: denghiTSNTInput.So ? `N'${denghiTSNTInput.So}'` : null,
        Ngay: denghiTSNTInput.Ngay ? `N'${denghiTSNTInput.Ngay}'` : null,
        ThoiGianBD: denghiTSNTInput.ThoiGianBD
          ? `N'${denghiTSNTInput.ThoiGianBD}'`
          : null,
        ThoiGianKT: denghiTSNTInput.ThoiGianKT
          ? `N'${denghiTSNTInput.ThoiGianKT}'`
          : null,
        NoiDungDN: `N'${denghiTSNTInput.NoiDungDN}'`, //crypto
        NoiDungTN: `N'${denghiTSNTInput.NoiDungTN}'`, //crypto
        MaCATTPvaTD: denghiTSNTInput.MaCATTPvaTD
          ? denghiTSNTInput.MaCATTPvaTD
          : null,
        MaCAQHvaTD: denghiTSNTInput.MaCAQHvaTD
          ? denghiTSNTInput.MaCAQHvaTD
          : null,
        MaDoiTuong: denghiTSNTInput.MaDoiTuong
          ? denghiTSNTInput.MaDoiTuong
          : null,
        MaHTHD: denghiTSNTInput.MaHTHD ? denghiTSNTInput.MaHTHD : null,
      },
    };
  };

  denghiTSNTs(utilsParams: UtilsParamsInput): Promise<DeNghiTSNT[]> {
    return this.denghiTSNTRepository.query(
      SP_GET_DATA_DECRYPT(
        'DeNghiTSNTs',
        "'MaDN != 0'",
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async denghiTSNT(id: number): Promise<DeNghiTSNT> {
    const result = await this.denghiTSNTRepository.query(
      SP_GET_DATA_DECRYPT('DeNghiTSNTs', `'MaDN = ${id}'`, 0, 1),
    );
    return result[0];
  }

  async createDeNghiTSNT(
    denghiTSNTInput: DeNghiTSNTInput,
    user: any,
  ): Promise<DeNghiTSNT> {
    const result = await this.denghiTSNTRepository.query(
      SP_CHANGE_DENGHITSNT(
        this.denghiTSNT_DataInput('CREATE', null, denghiTSNTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaDN: ${result[0].MaDN};`,
      TableName: 'DeNghiTSNTs',
    });
    return result[0];
  }

  async editDeNghiTSNT(
    id: number,
    denghiTSNTInput: DeNghiTSNTInput,
    user: any,
  ): Promise<DeNghiTSNT> {
    const result = await this.denghiTSNTRepository.query(
      SP_CHANGE_DENGHITSNT(
        this.denghiTSNT_DataInput('EDIT', id, denghiTSNTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaDN: ${result[0].MaDN};`,
      TableName: 'DeNghiTSNTs',
    });
    return result[0];
  }

  async deleteDeNghiTSNT(
    id: number,
    denghiTSNTInput: DeNghiTSNTInput,
    user: any,
  ): Promise<DeNghiTSNT> {
    const result = await this.denghiTSNTRepository.query(
      SP_CHANGE_DENGHITSNT(
        this.denghiTSNT_DataInput('DELETE', id, denghiTSNTInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaDN: ${result[0].MaDN};`,
      TableName: 'DeNghiTSNTs',
    });
    return result[0];
  }

  // many-to-many relation

  denghiTSNTs_tinhTPs(
    utilsParams: UtilsParamsInput,
  ): Promise<DeNghiTSNT_TinhTPType[]> {
    return this.denghiTSNTRepository.query(
      SP_GET_DATA(
        'DeNghiTSNTs_TinhTPs',
        `'MaDN != 0'`,
        'MaDN',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async createDeNghiTSNT_TinhTP(
    denghitsnt_tinhtpInput: DeNghiTSNT_TinhTPInput,
    user: any,
  ): Promise<DeNghiTSNT_TinhTPType> {
    const result = await this.denghiTSNTRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'DeNghiTSNTs_TinhTPs',
        `'MaTinhTP, MaDN'`,
        `'  ${denghitsnt_tinhtpInput.MaTinhTP},
            ${denghitsnt_tinhtpInput.MaDN}
        '`,
        `'MaTinhTP = ${denghitsnt_tinhtpInput.MaTinhTP}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `{ MaTinhTP: ${denghitsnt_tinhtpInput.MaTinhTP}, MaDN: ${denghitsnt_tinhtpInput.MaDN} };`,
      TableName: 'DeNghiTSNTs_TinhTPs',
    });
    return result[0];
  }

  async editDeNghiTSNT_TinhTP(
    denghitsnt_tinhtpInput: DeNghiTSNT_TinhTPInput,
    MaTinhTP: number,
    MaDN: number,
    user: any,
  ): Promise<DeNghiTSNT_TinhTPType> {
    await this.denghiTSNTRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'DeNghiTSNTs_TinhTPs',
        null,
        null,
        null,
        `'  MaTinhTP = ${denghitsnt_tinhtpInput.MaTinhTP},
            MaDN = ${denghitsnt_tinhtpInput.MaDN}
        '`,
        `'MaTinhTP = ${MaTinhTP} AND MaDN = ${MaDN}'`,
      ),
    );
    const result = await this.denghiTSNTRepository.query(
      SP_GET_DATA(
        'DeNghiTSNTs_TinhTPs',
        `'MaTinhTP = ${denghitsnt_tinhtpInput.MaTinhTP} AND MaDN = ${denghitsnt_tinhtpInput.MaDN}'`,
        'MaTinhTP',
        0,
        0,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `{ MaTinhTP: ${denghitsnt_tinhtpInput.MaTinhTP}, MaDN: ${denghitsnt_tinhtpInput.MaDN} };`,
      TableName: 'DeNghiTSNTs_TinhTPs',
    });
    return result[0];
  }

  async deleteDeNghiTSNT_TinhTP(
    MaTinhTP: number,
    MaDN: number,
    user: any,
  ): Promise<DeNghiTSNT_TinhTPType> {
    const result = await this.denghiTSNTRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'DeNghiTSNTs_TinhTPs',
        null,
        null,
        null,
        null,
        `'MaTinhTP = ${MaTinhTP} AND MaDN = ${MaDN}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `{ MaTinhTP: ${MaTinhTP}, MaDN: ${MaDN} };`,
      TableName: 'DeNghiTSNTs_TinhTPs',
    });
    return result[0];
  }

  // ResolveField

  async DauMoiPH_DN(MaDN: number): Promise<DauMoiPH_DN> {
    const result = await this.denghiTSNTRepository.query(
      SP_GET_DATA('DauMoiPH_DNs', `'MaDN = ${MaDN}'`, 'MaDMPH', 0, 1),
    );
    return result[0];
  }

  async CATTPvaTD(denghiTSNT: any): Promise<CATTPvaTD> {
    if (denghiTSNT.MaCATTPvaTD) {
      return this.dataloaderService.loaderCATTPvaTD.load(
        denghiTSNT.MaCATTPvaTD,
      );
    }
  }

  async CAQHvaTD(denghiTSNT: any): Promise<CAQHvaTD> {
    if (denghiTSNT.MaCAQHvaTD) {
      return this.dataloaderService.loaderCAQHvaTD.load(denghiTSNT.MaCAQHvaTD);
    }
  }

  async DiaBanDNs(MaDN: number): Promise<TinhTP[]> {
    const result = (await this.denghiTSNTRepository.query(
      SP_GET_DATA('DeNghiTSNTs_TinhTPs', `'MaDN = ${MaDN}'`, 'MaTinhTP', 0, 0),
    )) as [{ MaTinhTP: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderTinhTP.load(obj.MaTinhTP),
    );
    return await Promise.all(resultLoader);
  }

  async DoiTuong(denghiTSNT: any): Promise<DoiTuong> {
    if (denghiTSNT.MaDoiTuong) {
      return this.dataloaderService.loaderDoiTuong.load(denghiTSNT.MaDoiTuong);
    }
  }

  async LanhDaoDVDN(denghiTSNT: any): Promise<CBCS> {
    return this.dataloaderService.loaderCBCS.load(denghiTSNT.MaLanhDaoDVDN);
  }

  async CBPhuTrachDN(denghiTSNT: any): Promise<CBCS> {
    return this.dataloaderService.loaderCBCS.load(denghiTSNT.MaCBPhuTrachDN);
  }

  async LanhDaoCapTren(denghiTSNT: any): Promise<CBCS> {
    return this.dataloaderService.loaderCBCS.load(denghiTSNT.MaLanhDaoCapTren);
  }

  async DaiDienDonViTSNT(denghiTSNT: any): Promise<CBCS> {
    return this.dataloaderService.loaderCBCS.load(
      denghiTSNT.MaDaiDienDonViTSNT,
    );
  }

  async DonViDN(denghiTSNT: any): Promise<CAQHvaTD> {
    return this.dataloaderService.loaderCAQHvaTD.load(denghiTSNT.MaCAQHvaTD);
  }

  async QuyetDinhTSNT(MaDN: number): Promise<QuyetDinhTSNT> {
    const result = await this.denghiTSNTRepository.query(
      SP_GET_DATA_DECRYPT('QuyetDinhTSNTs', `'MaDN = ${MaDN}'`, 0, 1),
    );
    return result[0];
  }

  async HinhThucHD(denghiTSNT: any): Promise<HinhThucHD> {
    if (denghiTSNT.MaHTHD) {
      return this.dataloaderService.loaderHinhThucHD.load(denghiTSNT.MaHTHD);
    }
  }

  async KeHoachTSNT(MaDN: number): Promise<KeHoachTSNT> {
    const result = await this.denghiTSNTRepository.query(
      SP_GET_DATA_DECRYPT('KeHoachTSNTs', `'MaDN = ${MaDN}'`, 0, 1),
    );
    return result[0];
  }
}
