import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CBCS } from 'src/cbcss/CBCS.model';
import { ChuyenAn } from 'src/chuyenans/ChuyenAn.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { SP_CHANGE_DATA, SP_GET_DATA } from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { ThanhVienBCA } from './ThanhVienBCA.model';
import { ThanhVienBCAInput } from './type/ThanhVienBCA.input';

@Injectable()
export class ThanhVienBCAsService {
  constructor(
    @InjectRepository(ThanhVienBCA)
    private thanhvienBCARepository: Repository<ThanhVienBCA>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly thanhvienBCA_DataInput = (
    thanhvienBCAInput: ThanhVienBCAInput,
  ) => {
    return {
      BiDanh: thanhvienBCAInput.BiDanh
        ? `N''${thanhvienBCAInput.BiDanh}''`
        : null,
      ViTri: thanhvienBCAInput.ViTri ? `N''${thanhvienBCAInput.ViTri}''` : null,
      MaCA: thanhvienBCAInput.MaCA ? thanhvienBCAInput.MaCA : null,
      MaCBCS: thanhvienBCAInput.MaCBCS ? thanhvienBCAInput.MaCBCS : null,
    };
  };

  thanhvienBCAs(utilsParams: UtilsParamsInput): Promise<ThanhVienBCA[]> {
    return this.thanhvienBCARepository.query(
      SP_GET_DATA(
        'ThanhVienBCAs',
        `'MaTVBCA != 0'`,
        'MaTVBCA',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async thanhvienBCA(id: number): Promise<ThanhVienBCA> {
    const result = await this.thanhvienBCARepository.query(
      SP_GET_DATA('ThanhVienBCAs', `'MaTVBCA = ${id}'`, 'MaTVBCA', 0, 1),
    );
    return result[0];
  }

  async createThanhVienBCA(
    thanhvienBCAInput: ThanhVienBCAInput,
    user: any,
  ): Promise<ThanhVienBCA> {
    const result = await this.thanhvienBCARepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'ThanhVienBCAs',
        `'BiDanh, ViTri, MaCA, MaCBCS'`,
        `N' ${this.thanhvienBCA_DataInput(thanhvienBCAInput).BiDanh},
            ${this.thanhvienBCA_DataInput(thanhvienBCAInput).ViTri},
            ${this.thanhvienBCA_DataInput(thanhvienBCAInput).MaCA},
            ${this.thanhvienBCA_DataInput(thanhvienBCAInput).MaCBCS}
        '`,
        "'MaTVBCA = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaTVBCA: ${result[0].MaTVBCA};`,
      TableName: 'ThanhVienBCAs',
    });
    return result[0];
  }

  async editThanhVienBCA(
    thanhvienBCAInput: ThanhVienBCAInput,
    id: number,
    user: any,
  ): Promise<ThanhVienBCA> {
    const result = await this.thanhvienBCARepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'ThanhVienBCAs',
        null,
        null,
        null,
        `N' BiDanh = ${this.thanhvienBCA_DataInput(thanhvienBCAInput).BiDanh},
            ViTri = ${this.thanhvienBCA_DataInput(thanhvienBCAInput).ViTri},
            MaCA = ${this.thanhvienBCA_DataInput(thanhvienBCAInput).MaCA},
            MaCBCS = ${this.thanhvienBCA_DataInput(thanhvienBCAInput).MaCBCS}
        '`,
        `'MaTVBCA = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaTVBCA: ${result[0].MaTVBCA};`,
      TableName: 'ThanhVienBCAs',
    });
    return result[0];
  }

  async deleteThanhVienBCA(id: number, user: any): Promise<ThanhVienBCA> {
    const result = await this.thanhvienBCARepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'ThanhVienBCAs',
        null,
        null,
        null,
        null,
        `'MaTVBCA = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaTVBCA: ${result[0].MaTVBCA};`,
      TableName: 'ThanhVienBCAs',
    });
    return result[0];
  }

  // ResolveField

  async ChuyenAn(thanhvienBCA: any): Promise<ChuyenAn> {
    if (thanhvienBCA.MaCA) {
      return this.dataloaderService.loaderChuyenAn.load(thanhvienBCA.MaCA);
    }
  }

  async CBCS(thanhvienBCA: any): Promise<CBCS> {
    if (thanhvienBCA.MaCBCS) {
      return this.dataloaderService.loaderCBCS.load(thanhvienBCA.MaCBCS);
    }
  }
}
