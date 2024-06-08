import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import {
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { LoaiDT } from './LoaiDT.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';

@Injectable()
export class LoaiDTsService {
  constructor(
    @InjectRepository(LoaiDT) private loaiDTRepository: Repository<LoaiDT>,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly loaiDT_DataInput = (loaiDT: string) => {
    return {
      LoaiDT: loaiDT ? `N''${loaiDT}''` : null,
    };
  };

  loaiDTs(utilsParams: UtilsParamsInput): Promise<LoaiDT[]> {
    return this.loaiDTRepository.query(
      SP_GET_DATA(
        'LoaiDTs',
        "'MaLoaiDT != 0'",
        'MaLoaiDT',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async loaiDT(id: number): Promise<LoaiDT> {
    const result = await this.loaiDTRepository.query(
      SP_GET_DATA('LoaiDTs', `'MaLoaiDT = ${id}'`, 'MaLoaiDT', 0, 1),
    );
    return result[0];
  }

  async createLoaiDT(loaiDT: string, user: any): Promise<LoaiDT> {
    const result = await this.loaiDTRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'LoaiDTs',
        'LoaiDT',
        `N' ${this.loaiDT_DataInput(loaiDT).LoaiDT}'`,
        "'MaLoaiDT = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaLoaiDT: ${result[0].MaLoaiDT};`,
      TableName: 'LoaiDTs',
    });
    return result[0];
  }

  async editLoaiDT(loaiDT: string, id: number, user: any): Promise<LoaiDT> {
    const result = await this.loaiDTRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'LoaiDTs',
        null,
        null,
        null,
        `N' LoaiDT = ${this.loaiDT_DataInput(loaiDT).LoaiDT}'`,
        `'MaLoaiDT = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaLoaiDT: ${result[0].MaLoaiDT};`,
      TableName: 'LoaiDTs',
    });
    return result[0];
  }

  async deleteLoaiDT(id: number, user: any): Promise<LoaiDT> {
    const result = await this.loaiDTRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'LoaiDTs',
        null,
        null,
        null,
        null,
        `'MaLoaiDT = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaLoaiDT: ${result[0].MaLoaiDT};`,
      TableName: 'LoaiDTs',
    });
    return result[0];
  }

  // ResolveField

  DoiTuongs(MaLoaiDT: number): Promise<DoiTuong[]> {
    return this.loaiDTRepository.query(
      SP_GET_DATA_DECRYPT('DoiTuongs', `'MaLoai = ${MaLoaiDT}'`, 0, 0),
    );
  }
}
