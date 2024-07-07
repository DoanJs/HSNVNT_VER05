import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import {
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { KetQuaXMQuanHe } from './KetQuaXMQuanHe.model';
import { KetQuaXMQuanHeInput } from './type/KetQuaXMQuanHe.input';

@Injectable()
export class KetQuaXMQuanHesService {
  constructor(
    @InjectRepository(KetQuaXMQuanHe)
    private ketQuaXMQuanHeRepository: Repository<KetQuaXMQuanHe>,
    private readonly dataloaderService: DataLoaderService,
    private readonly actionDBsService: ActionDBsService,
  ) {}

  public readonly ketquaXMQuanHe_DataInput = (
    ketquaXMQuanHeInput: KetQuaXMQuanHeInput,
  ) => {
    return {
      So: ketquaXMQuanHeInput.So ? `N''${ketquaXMQuanHeInput.So}''` : null,
      Ngay: ketquaXMQuanHeInput.Ngay
        ? `N''${ketquaXMQuanHeInput.Ngay}''`
        : null,
      MaLanhDaoPD: ketquaXMQuanHeInput.MaLanhDaoPD
        ? ketquaXMQuanHeInput.MaLanhDaoPD
        : null,
      MaBCPHQH: ketquaXMQuanHeInput.MaBCPHQH
        ? ketquaXMQuanHeInput.MaBCPHQH
        : null,
    };
  };

  ketQuaXMQuanHes(utilsParams: UtilsParamsInput): Promise<KetQuaXMQuanHe[]> {
    return this.ketQuaXMQuanHeRepository.query(
      SP_GET_DATA(
        'KetQuaXMQuanHes',
        "'MaKQXMQH != 0'",
        'MaKQXMQH',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async ketQuaXMQuanHe(id: number): Promise<KetQuaXMQuanHe> {
    const result = await this.ketQuaXMQuanHeRepository.query(
      SP_GET_DATA('KetQuaXMQuanHes', `'MaKQXMQH = ${id}'`, 'MaKQXMQH', 0, 1),
    );
    return result[0];
  }

  async createKetQuaXMQuanHe(
    ketQuaXMQuanHe: KetQuaXMQuanHeInput,
    user: any,
  ): Promise<KetQuaXMQuanHe> {
    const result = await this.ketQuaXMQuanHeRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'KetQuaXMQuanHes',
        "'So, Ngay, MaLanhDaoPD, MaBCPHQH'",
        `N' ${this.ketquaXMQuanHe_DataInput(ketQuaXMQuanHe).So},
            ${this.ketquaXMQuanHe_DataInput(ketQuaXMQuanHe).Ngay},
            ${this.ketquaXMQuanHe_DataInput(ketQuaXMQuanHe).MaLanhDaoPD},
            ${this.ketquaXMQuanHe_DataInput(ketQuaXMQuanHe).MaBCPHQH}
        '`,
        "'MaKQXMQH = SCOPE_IDENTITY()'",
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaKQXMQH: ${result[0].MaKQXMQH};`,
      TableName: 'KetQuaXMQuanHes',
    });
    return result[0];
  }

  async editKetQuaXMQuanHe(
    ketQuaXMQuanHe: KetQuaXMQuanHeInput,
    id: number,
    user: any,
  ): Promise<KetQuaXMQuanHe> {
    const result = await this.ketQuaXMQuanHeRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'KetQuaXMQuanHes',
        null,
        null,
        null,
        `N' So = ${this.ketquaXMQuanHe_DataInput(ketQuaXMQuanHe).So},
            Ngay = ${this.ketquaXMQuanHe_DataInput(ketQuaXMQuanHe).Ngay},
            MaLanhDaoPD = ${
              this.ketquaXMQuanHe_DataInput(ketQuaXMQuanHe).MaLanhDaoPD
            },
            MaBCPHQH = ${this.ketquaXMQuanHe_DataInput(ketQuaXMQuanHe).MaBCPHQH}
        '`,
        `'MaKQXMQH = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaKQXMQH: ${result[0].MaKQXMQH};`,
      TableName: 'KetQuaXMQuanHes',
    });
    return result[0];
  }

  async deleteKetQuaXMQuanHe(id: number, user: any): Promise<KetQuaXMQuanHe> {
    const result = await this.ketQuaXMQuanHeRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'KetQuaXMQuanHes',
        null,
        null,
        null,
        null,
        `'MaKQXMQH = ${id}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaKQXMQH: ${result[0].MaKQXMQH};`,
      TableName: 'KetQuaXMQuanHes',
    });
    return result[0];
  }

  // ResolveField

  async BaoCaoPHQH(ketquaXMQuanHe: any): Promise<BaoCaoPHQH> {
    const result = await this.ketQuaXMQuanHeRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoPHQHs',
        `'MaBCPHQH  = ${ketquaXMQuanHe.MaBCPHQH}'`,
        0,
        1,
      ),
    );
    return result[0];
  }

  async LanhDaoPD(ketquaXMDiaChi: any): Promise<CBCS> {
    if (ketquaXMDiaChi.MaLanhDaoPD) {
      return this.dataloaderService.loaderCBCS.load(ketquaXMDiaChi.MaLanhDaoPD);
    }
  }
}
