import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { ChuyenAn } from 'src/chuyenans/ChuyenAn.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { SP_CHANGE_DATA, SP_GET_DATA } from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { DoiTuongCA } from './DoiTuongCA.model';
import { DoiTuongCAInput } from './type/DoiTuongCA.input';

@Injectable()
export class DoiTuongCAsService {
  constructor(
    @InjectRepository(DoiTuongCA)
    private doituongCARepository: Repository<DoiTuongCA>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly doituongCA_DataInput = (doituongCAInput: DoiTuongCAInput) => {
    return {
      BiSo: doituongCAInput.BiSo ? `N''${doituongCAInput.BiSo}''` : null,
      ViTri: doituongCAInput.ViTri ? `N''${doituongCAInput.ViTri}''` : null,
      MaCA: doituongCAInput.MaCA ? doituongCAInput.MaCA : null,
      MaDoiTuong: doituongCAInput.MaDoiTuong
        ? doituongCAInput.MaDoiTuong
        : null,
    };
  };

  doituongCAs(utilsParams: UtilsParamsInput): Promise<DoiTuongCA[]> {
    return this.doituongCARepository.query(
      SP_GET_DATA(
        'DoiTuongCAs',
        `'MaDTCA != 0'`,
        'MaDTCA',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  // async doituongCAsOpen(
  //   conditionCol: string,
  //   value: string,
  // ): Promise<DoiTuongCA[]> {
  //   return await this.doituongCARepository.query(
  //     `SELECT * FROM DoiTuongCAs WHERE ${conditionCol} = ${value}`,
  //   );
  // }

  async doituongCA(id: number): Promise<DoiTuongCA> {
    const result = await this.doituongCARepository.query(
      SP_GET_DATA('DoiTuongCAs', `'MaDTCA = ${id}'`, 'MaDTCA', 0, 1),
    );
    return result[0];
  }

  async createDoiTuongCA(
    doituongCAInput: DoiTuongCAInput,
    user: any,
  ): Promise<DoiTuongCA> {
    const result = await this.doituongCARepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'DoiTuongCAs',
        `'BiSo, ViTri, MaCA, MaDoiTuong'`,
        `N' ${this.doituongCA_DataInput(doituongCAInput).BiSo},
            ${this.doituongCA_DataInput(doituongCAInput).ViTri},
            ${this.doituongCA_DataInput(doituongCAInput).MaCA},
            ${this.doituongCA_DataInput(doituongCAInput).MaDoiTuong}
        '`,
        "'MaDTCA = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaDTCA: ${result[0].MaDTCA};`,
      Time: `${moment().format()}`,
      TableName: 'DoiTuongCAs',
    });
    return result[0];
  }

  async editDoiTuongCA(
    doituongCAInput: DoiTuongCAInput,
    id: number,
    user: any,
  ): Promise<DoiTuongCA> {
    const result = await this.doituongCARepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'DoiTuongCAs',
        null,
        null,
        null,
        `N' BiSo = ${this.doituongCA_DataInput(doituongCAInput).BiSo},
            ViTri = ${this.doituongCA_DataInput(doituongCAInput).ViTri},
            MaCA = ${this.doituongCA_DataInput(doituongCAInput).MaCA},
            MaDoiTuong = ${
              this.doituongCA_DataInput(doituongCAInput).MaDoiTuong
            }
        '`,
        `'MaDTCA = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaDTCA: ${result[0].MaDTCA};`,
      Time: `${moment().format()}`,
      TableName: 'DoiTuongCAs',
    });
    return result[0];
  }

  async deleteDoiTuongCA(id: number, user: any): Promise<DoiTuongCA> {
    const result = await this.doituongCARepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'DoiTuongCAs',
        null,
        null,
        null,
        null,
        `'MaDTCA = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaDTCA: ${result[0].MaDTCA};`,
      Time: `${moment().format()}`,
      TableName: 'DoiTuongCAs',
    });
    return result[0];
  }

  // ResolveField

  async ChuyenAn(doituongCA: any): Promise<ChuyenAn> {
    return this.dataloaderService.loaderChuyenAn.load(doituongCA.MaCA);
  }

  async DoiTuong(doituongCA: any): Promise<DoiTuong> {
    return this.dataloaderService.loaderDoiTuong.load(doituongCA.MaDoiTuong);
  }
}
