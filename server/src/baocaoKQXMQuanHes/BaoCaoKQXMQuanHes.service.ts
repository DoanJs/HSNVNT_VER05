import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import {
  SP_CHANGE_BAOCAOKQXMQUANHE,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { BaoCaoKQXMQuanHe } from './BaoCaoKQXMQuanHe.model';
import { BaoCaoKQXMQuanHeInput } from './type/BaoCaoKQXMQuanHe.input';

@Injectable()
export class BaoCaoKQXMQuanHesService {
  constructor(
    @InjectRepository(BaoCaoKQXMQuanHe)
    private baocaoKQXMQuanHeRepository: Repository<BaoCaoKQXMQuanHe>,
    private dataloaderService: DataLoaderService,
    private actionDBsService: ActionDBsService,
  ) {}
  public readonly baocaoKQXMQuanHe_DataInput = (
    Type: string,
    MaBCKQXMQH: number | null,
    baocaoKQXMQuanHeInput: BaoCaoKQXMQuanHeInput,
  ) => {
    return {
      Type,
      MaBCKQXMQH,
      BaoCaoKQXMQuanHeInput: {
        Ngay: baocaoKQXMQuanHeInput.Ngay ? `N'${baocaoKQXMQuanHeInput.Ngay}'` : null,
        HoTen: `N'${baocaoKQXMQuanHeInput.HoTen}'`, //crypto
        TenKhac: baocaoKQXMQuanHeInput.TenKhac
          ? `N'${baocaoKQXMQuanHeInput.TenKhac}'`
          : null,
        GioiTinh: baocaoKQXMQuanHeInput.GioiTinh
          ? baocaoKQXMQuanHeInput.GioiTinh
          : null,
        NamSinh: baocaoKQXMQuanHeInput.NamSinh
          ? `N'${baocaoKQXMQuanHeInput.NamSinh}'`
          : null,
        QueQuan: baocaoKQXMQuanHeInput.QueQuan
          ? `N'${baocaoKQXMQuanHeInput.QueQuan}'`
          : null,
        HKTT: baocaoKQXMQuanHeInput.HKTT
          ? `N'${baocaoKQXMQuanHeInput.HKTT}'`
          : null,
        NoiO: `N'${baocaoKQXMQuanHeInput.NoiO}'`, //crypto
        NgheNghiep: baocaoKQXMQuanHeInput.NgheNghiep
          ? `N'${baocaoKQXMQuanHeInput.NgheNghiep}'`
          : null,
        ChucVu: baocaoKQXMQuanHeInput.ChucVu
          ? `N'${baocaoKQXMQuanHeInput.ChucVu}'`
          : null,
        NoiLamViec: baocaoKQXMQuanHeInput.NoiLamViec
          ? `N'${baocaoKQXMQuanHeInput.NoiLamViec}'`
          : null,
        QuanHeGDXH: baocaoKQXMQuanHeInput.QuanHeGDXH
          ? `N'${baocaoKQXMQuanHeInput.QuanHeGDXH}'`
          : null,
        BienPhapXM: baocaoKQXMQuanHeInput.BienPhapXM
          ? `N'${baocaoKQXMQuanHeInput.BienPhapXM}'`
          : null,
        MaBCPHQH: baocaoKQXMQuanHeInput.MaBCPHQH
          ? baocaoKQXMQuanHeInput.MaBCPHQH
          : null,
        MaLanhDaoPD: baocaoKQXMQuanHeInput.MaLanhDaoPD
          ? baocaoKQXMQuanHeInput.MaLanhDaoPD
          : null,
        MaBCHPhuTrach: baocaoKQXMQuanHeInput.MaBCHPhuTrach
          ? baocaoKQXMQuanHeInput.MaBCHPhuTrach
          : null,
        MaTSXacMinh: baocaoKQXMQuanHeInput.MaTSXacMinh
          ? baocaoKQXMQuanHeInput.MaTSXacMinh
          : null,
      },
    };
  };

  baocaoKQXMQuanHes(
    utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoKQXMQuanHe[]> {
    return this.baocaoKQXMQuanHeRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKQXMQuanHes',
        "'MaBCKQXMQH != 0'",
        utilsParams.skip && utilsParams.skip > 0 ? utilsParams.skip : 0,
        utilsParams.take && utilsParams.take > 0 ? utilsParams.take : 0,
      ),
    );
  }

  async baocaoKQXMQuanHe(id: number): Promise<BaoCaoKQXMQuanHe> {
    const result = await this.baocaoKQXMQuanHeRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKQXMQuanHes', `"MaBCKQXMQH = ${id}"`, 0, 1),
    );
    return result[0];
  }

  async createBaoCaoKQXMQuanHe(
    baocaoKQXMQuanHeInput: BaoCaoKQXMQuanHeInput,
    user: any,
  ): Promise<BaoCaoKQXMQuanHe> {
    const result = await this.baocaoKQXMQuanHeRepository.query(
      SP_CHANGE_BAOCAOKQXMQUANHE(
        this.baocaoKQXMQuanHe_DataInput('CREATE', null, baocaoKQXMQuanHeInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaBCKQXMQH: ${result[0].MaBCKQXMQH};`,
      TableName: 'BaoCaoKQXMQuanHes',
    });
    return result[0];
  }

  async editBaoCaoKQXMQuanHe(
    baocaoKQXMQuanHeInput: BaoCaoKQXMQuanHeInput,
    id: number,
    user: any,
  ): Promise<BaoCaoKQXMQuanHe> {
    const result = await this.baocaoKQXMQuanHeRepository.query(
      SP_CHANGE_BAOCAOKQXMQUANHE(
        this.baocaoKQXMQuanHe_DataInput('EDIT', id, baocaoKQXMQuanHeInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaBCKQXMQH: ${result[0].MaBCKQXMQH};`,
      TableName: 'BaoCaoKQXMQuanHes',
    });
    return result[0];
  }

  async deleteBaoCaoKQXMQuanHe(
    baocaoKQXMQuanHeInput: BaoCaoKQXMQuanHeInput,
    id: number,
    user: any,
  ): Promise<BaoCaoKQXMQuanHe> {
    const result = await this.baocaoKQXMQuanHeRepository.query(
      SP_CHANGE_BAOCAOKQXMQUANHE(
        this.baocaoKQXMQuanHe_DataInput('DELETE', id, baocaoKQXMQuanHeInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaBCKQXMQH: ${result[0].MaBCKQXMQH};`,
      TableName: 'BaoCaoKQXMQuanHes',
    });
    return result[0];
  }

  // ResolveField

  async TSXacMinh(baocaoKQXMQuanHe: any): Promise<CBCS> {
    if (baocaoKQXMQuanHe.MaTSXacMinh) {
      return this.dataloaderService.loaderCBCS.load(
        baocaoKQXMQuanHe.MaTSXacMinh,
      );
    }
  }

  async LanhDaoPD(baocaoKQXMQuanHe: any): Promise<CBCS> {
    if (baocaoKQXMQuanHe.MaLanhDaoPD) {
      return this.dataloaderService.loaderCBCS.load(
        baocaoKQXMQuanHe.MaLanhDaoPD,
      );
    }
  }

  async BanChiHuy(baocaoKQXMQuanHe: any): Promise<CBCS> {
    if (baocaoKQXMQuanHe.MaBanChiHuy) {
      return this.dataloaderService.loaderCBCS.load(
        baocaoKQXMQuanHe.MaBanChiHuy,
      );
    }
  }

  async BaoCaoPHQH(baocaoKQXMQuanHe: any): Promise<BaoCaoPHQH> {
    const result = await this.baocaoKQXMQuanHeRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoPHQHs',
        `'MaBCPHQH = ${baocaoKQXMQuanHe.MaBCPHQH}'`,
        0,
        1,
      ),
    );
    return result[0];
  }
}
