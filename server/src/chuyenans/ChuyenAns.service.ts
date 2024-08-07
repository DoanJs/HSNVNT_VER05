import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { DoiTuongCA } from 'src/doituongCAs/DoiTuongCA.model';
import { TinhChatDT } from 'src/tinhchatDTs/TinhChatDT.model';
import {
  SP_CHANGE_CHUYENAN,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { ChuyenAn } from './ChuyenAn.model';
import { ChuyenAnInput } from './type/ChuyenAn.input';
import { ThanhVienBCA } from 'src/thanhvienBCAs/ThanhVienBCA.model';

@Injectable()
export class ChuyenAnsService {
  constructor(
    @InjectRepository(ChuyenAn)
    private chuyenanRepository: Repository<ChuyenAn>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly chuyenAn_DataInput = (
    Type: string,
    MaCA: number | null,
    chuyenanInput: ChuyenAnInput,
  ) => {
    return {
      Type,
      MaCA,
      ChuyenAnInput: {
        BiSo: chuyenanInput.BiSo ? `N'${chuyenanInput.BiSo}'` : null,
        ThoiGianBD: chuyenanInput.ThoiGianBD
          ? `N'${chuyenanInput.ThoiGianBD}'`
          : null,
        TenCA: `N'${chuyenanInput.TenCA}'`, //crypto
        NoiDung: `N'${chuyenanInput.NoiDung}'`, //crypto
        MaTCDT: chuyenanInput.MaTCDT ? chuyenanInput.MaTCDT : null,
      },
    };
  };
  chuyenans(utilsParams: UtilsParamsInput): Promise<ChuyenAn[]> {
    return this.chuyenanRepository.query(
      SP_GET_DATA_DECRYPT(
        'ChuyenAns',
        "'MaCA != 0'",
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async chuyenan(id: number): Promise<ChuyenAn> {
    const cbcss = await this.chuyenanRepository.query(
      SP_GET_DATA_DECRYPT('ChuyenAns', `'MaCA = ${id}'`, 0, 1),
    );
    return cbcss[0];
  }

  async createChuyenAn(
    chuyenanInput: ChuyenAnInput,
    user: any,
  ): Promise<ChuyenAn> {
    const result = await this.chuyenanRepository.query(
      SP_CHANGE_CHUYENAN(
        this.chuyenAn_DataInput('CREATE', null, chuyenanInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaCA: ${result[0].MaCA};`,
      TableName: 'ChuyenAns',
    });
    return result[0];
  }

  async editChuyenAn(
    chuyenanInput: ChuyenAnInput,
    id: number,
    user: any,
  ): Promise<ChuyenAn> {
    const result = await this.chuyenanRepository.query(
      SP_CHANGE_CHUYENAN(this.chuyenAn_DataInput('EDIT', id, chuyenanInput)),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaCA: ${result[0].MaCA};`,
      TableName: 'ChuyenAns',
    });
    return result[0];
  }

  async deleteChuyenAn(
    chuyenanInput: ChuyenAnInput,
    id: number,
    user: any,
  ): Promise<ChuyenAn> {
    const result = await this.chuyenanRepository.query(
      SP_CHANGE_CHUYENAN(this.chuyenAn_DataInput('DELETE', id, chuyenanInput)),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaCA: ${result[0].MaCA};`,
      TableName: 'ChuyenAns',
    });
    return result[0];
  }

  //  ResolveField

  async TinhChatDT(chuyenan: any): Promise<TinhChatDT> {
    if (chuyenan.MaTCDT) {
      return this.dataloaderService.loaderTinhChatDT.load(chuyenan.MaTCDT);
    }
  }

  async DoiTuongCAs(MaCA: number): Promise<DoiTuongCA[]> {
    return this.chuyenanRepository.query(
      SP_GET_DATA('DoiTuongCAs', `'MaCA = ${MaCA}'`, 'MaDTCA', 0, 0),
    );
  }

  async ThanhVienBCAs(MaCA: number): Promise<ThanhVienBCA[]> {
    return this.chuyenanRepository.query(
      SP_GET_DATA('ThanhVienBCAs', `'MaCA = ${MaCA}'`, 'MaTVBCA', 0, 0),
    );
  }
}
