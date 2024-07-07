import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import {
  SP_CHANGE_BAOCAOKQGH,
  SP_CHANGE_DATA,
  SP_GET_DATA,
  SP_GET_DATA_DECRYPT,
} from 'src/utils/mssql/query';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { BaoCaoKQGH } from './BaoCaoKQGH.model';
import { BaoCaoKQGHInput } from './type/BaoCaoKQGH.input';
import { BaoCaoKQGH_CBCSInput } from './type/BaoCaoKQGH_CBCS.input';
import { BaoCaoKQGH_CBCSType } from './type/BaoCaoKQGH_CBCS.type';

@Injectable()
export class BaoCaoKQGHsService {
  constructor(
    @InjectRepository(BaoCaoKQGH)
    private baocaoKQGHRepository: Repository<BaoCaoKQGH>,
    private dataloaderService: DataLoaderService,
    private actionDBsService: ActionDBsService,
  ) {}
  public readonly baocaoKQGH_DataInput = (
    Type: string,
    MaBCKQGH: number | null,
    baocaoKQGHInput: BaoCaoKQGHInput,
  ) => {
    return {
      Type,
      MaBCKQGH,
      BaoCaoKQGHInput: {
        Ngay: baocaoKQGHInput.Ngay ? `N'${baocaoKQGHInput.Ngay}'` : null,
        HinhAnh: `N'${baocaoKQGHInput.HinhAnh}'`, //crypto
        MucDich: baocaoKQGHInput.MucDich
          ? `N'${baocaoKQGHInput.MucDich}'`
          : null,
        ThoiGian: baocaoKQGHInput.ThoiGian
          ? `N'${baocaoKQGHInput.ThoiGian}'`
          : null,
        DiaDiem: baocaoKQGHInput.DiaDiem
          ? `N'${baocaoKQGHInput.DiaDiem}'`
          : null,
        PhuongTienSD: baocaoKQGHInput.PhuongTienSD
          ? `N'${baocaoKQGHInput.PhuongTienSD}'`
          : null,
        VaiNguyTrang: baocaoKQGHInput.VaiNguyTrang
          ? `N'${baocaoKQGHInput.VaiNguyTrang}'`
          : null,
        NoiDung: baocaoKQGHInput.NoiDung
          ? `N'${baocaoKQGHInput.NoiDung}'`
          : null,

        MaKQ: baocaoKQGHInput.MaKQ ? baocaoKQGHInput.MaKQ : null,
        MaLanhDaoPD: baocaoKQGHInput.MaLanhDaoPD
          ? baocaoKQGHInput.MaLanhDaoPD
          : null,
      },
    };
  };

  baocaoKQGHs(utilsParams: UtilsParamsInput): Promise<BaoCaoKQGH[]> {
    return this.baocaoKQGHRepository.query(
      SP_GET_DATA_DECRYPT(
        'BaoCaoKQGHs',
        "'MaBCKQGH != 0'",
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async baocaoKQGH(id: number): Promise<BaoCaoKQGH> {
    const result = await this.baocaoKQGHRepository.query(
      SP_GET_DATA_DECRYPT('BaoCaoKQGHs', `'MaBCKQGH = ${id}'`, 0, 1),
    );
    return result[0];
  }

  async createBaoCaoKQGH(
    baocaoKQGHInput: BaoCaoKQGHInput,
    user: any,
  ): Promise<BaoCaoKQGH> {
    const result = await this.baocaoKQGHRepository.query(
      SP_CHANGE_BAOCAOKQGH(
        this.baocaoKQGH_DataInput('CREATE', null, baocaoKQGHInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `MaBCKQGH: ${result[0].MaBCKQGH};`,
      TableName: 'BaoCaoKQGHs',
    });
    return result[0];
  }

  async editBaoCaoKQGH(
    baocaoKQGHInput: BaoCaoKQGHInput,
    id: number,
    user: any,
  ): Promise<BaoCaoKQGH> {
    const result = await this.baocaoKQGHRepository.query(
      SP_CHANGE_BAOCAOKQGH(
        this.baocaoKQGH_DataInput('EDIT', id, baocaoKQGHInput),
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `MaBCKQGH: ${result[0].MaBCKQGH};`,
      TableName: 'BaoCaoKQGHs',
    });
    return result[0];
  }

  async deleteBaoCaoKQGH(
    baocaoKQGHInput: BaoCaoKQGHInput,
    id: number,
    user: any,
  ): Promise<BaoCaoKQGH> {
    const result = await this.baocaoKQGHRepository.query(
      SP_CHANGE_BAOCAOKQGH(
        this.baocaoKQGH_DataInput('DELETE', id, baocaoKQGHInput),
      ),
    );

    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `MaBCKQGH: ${result[0].MaBCKQGH};`,
      TableName: 'BaoCaoKQGHs',
    });
    return result[0];
  }

  // many-to-many

  async baocaoKQGHs_cbcss(
    utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoKQGH_CBCSType[]> {
    return this.baocaoKQGHRepository.query(
      SP_GET_DATA(
        'BaoCaoKQGHs_CBCSs',
        `'MaBCKQGH != 0'`,
        'MaBCKQGH',
        utilsParams.skip ? utilsParams.skip : 0,
        utilsParams.take ? utilsParams.take : 0,
      ),
    );
  }

  async createBaoCaoKQGH_CBCS(
    baocaokqgh_cbcsInput: BaoCaoKQGH_CBCSInput,
    user: any,
  ): Promise<BaoCaoKQGH_CBCSType> {
    const result = await this.baocaoKQGHRepository.query(
      SP_CHANGE_DATA(
        "'CREATE'",
        'BaoCaoKQGHs_CBCSs',
        `'MaBCKQGH, MaCBCS'`,
        `'  ${baocaokqgh_cbcsInput.MaBCKQGH},
            ${baocaokqgh_cbcsInput.MaCBCS}
        '`,
        `'MaBCKQGH = ${baocaokqgh_cbcsInput.MaBCKQGH}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'CREATE',
      Other: `{ MaBCKQGH: ${baocaokqgh_cbcsInput.MaBCKQGH}, MaCBCS: ${baocaokqgh_cbcsInput.MaCBCS} };`,
      TableName: 'BaoCaoKQGHs_CBCSs',
    });
    return result[0];
  }

  async editBaoCaoKQGH_CBCS(
    baocaokqgh_cbcsInput: BaoCaoKQGH_CBCSInput,
    MaBCKQGH: number,
    MaCBCS: number,
    user: any,
  ): Promise<BaoCaoKQGH_CBCSType> {
    await this.baocaoKQGHRepository.query(
      SP_CHANGE_DATA(
        "'EDIT'",
        'BaoCaoKQGHs_CBCSs',
        null,
        null,
        null,
        `'  MaBCKQGH = ${baocaokqgh_cbcsInput.MaBCKQGH},
            MaCBCS = ${baocaokqgh_cbcsInput.MaCBCS}
        '`,
        `'MaBCKQGH = ${MaBCKQGH} AND MaCBCS = ${MaCBCS}'`,
      ),
    );
    const result = await this.baocaoKQGHRepository.query(
      SP_GET_DATA(
        'BaoCaoKQGHs_CBCSs',
        `'MaBCKQGH = ${baocaokqgh_cbcsInput.MaBCKQGH} AND MaCBCS = ${baocaokqgh_cbcsInput.MaCBCS}'`,
        'MaBCKQGH',
        0,
        0,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'EDIT',
      Other: `{ MaBCKQGH: ${baocaokqgh_cbcsInput.MaBCKQGH}, MaCBCS: ${baocaokqgh_cbcsInput.MaCBCS} };`,
      TableName: 'BaoCaoKQGHs_CBCSs',
    });
    return result[0];
  }

  async deleteBaoCaoKQGH_CBCS(
    MaBCKQGH: number,
    MaCBCS: number,
    user: any,
  ): Promise<BaoCaoKQGH_CBCSType> {
    const result = await this.baocaoKQGHRepository.query(
      SP_CHANGE_DATA(
        "'DELETE'",
        'BaoCaoKQGHs_CBCSs',
        null,
        null,
        null,
        null,
        `'MaBCKQGH = ${MaBCKQGH} AND MaCBCS = ${MaCBCS}'`,
      ),
    );
    this.actionDBsService.createActionDB({
      MaHistory: user.MaHistory,
      Action: 'DELETE',
      Other: `{ MaBCKQGH: ${MaBCKQGH}, MaCBCS: ${MaCBCS} };`,
      TableName: 'BaoCaoKQGHs_CBCSs',
    });
    return result[0];
  }

  // ResolveField
  async KetQuaTSNT(baocaoKQGH: any): Promise<KetQuaTSNT> {
    if (baocaoKQGH.MaKQ) {
      return this.dataloaderService.loaderKetQuaTSNT.load(baocaoKQGH.MaKQ);
    }
  }

  async TSThucHiens(MaBCKQGH: number): Promise<CBCS[]> {
    const result = (await this.baocaoKQGHRepository.query(
      SP_GET_DATA(
        'BaoCaoKQGHs_CBCSs',
        `'MaBCKQGH = ${MaBCKQGH}'`,
        'MaCBCS',
        0,
        0,
      ),
    )) as [{ MaCBCS: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderCBCS.load(obj.MaCBCS),
    );
    return await Promise.all(resultLoader);
  }

  async LanhDaoPD(baocaoKQGH: any): Promise<CBCS> {
    if (baocaoKQGH.MaLanhDaoPD) {
      return this.dataloaderService.loaderCBCS.load(baocaoKQGH.MaLanhDaoPD);
    }
  }
}
