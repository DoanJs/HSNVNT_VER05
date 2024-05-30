import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataLoaderService } from 'src/dataloader/Dataloader.service';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Repository } from 'typeorm';
import { BienPhapDT } from './BienPhapDT.model';

@Injectable()
export class BienPhapDTsService {
  constructor(
    @InjectRepository(BienPhapDT) private bienPhapDTRepository: Repository<BienPhapDT>,
    private readonly dataloaderService: DataLoaderService,

  ) { }

  bienPhapDTs(utilsParams: UtilsParamsInput): Promise<BienPhapDT[]> {
    return this.bienPhapDTRepository.query(
      `DECLARE @lengthTable INT
      SELECT @lengthTable = COUNT(*) FROM BienPhapDTs 
      SELECT * FROM BienPhapDTs WHERE ${utilsParams.condition ? utilsParams.condition : 'MaBPDT!=0'
      } 
      ORDER BY MaBPDT OFFSET 
      ${utilsParams.skip && utilsParams.skip > 0 ? utilsParams.skip : 0
      } ROWS FETCH NEXT 
      ${utilsParams.take && utilsParams.take > 0
        ? utilsParams.take
        : '@lengthTable'
      } ROWS ONLY`,
    );
  }

  async bienPhapDT(id: number): Promise<BienPhapDT> {
    const result = await this.bienPhapDTRepository.query(
      `SELECT * FROM BienPhapDTs WHERE MaBPDT = ${id}`,
    );
    return result[0];
  }

  async createBienPhapDT(bienPhapDT: string): Promise<BienPhapDT> {
    const result = await this.bienPhapDTRepository.query(
      `INSERT INTO BienPhapDTs VALUES (N'${bienPhapDT}')
        SELECT * FROM BienPhapDTs WHERE MaBPDT = SCOPE_IDENTITY()
      `,
    );
    return result[0];
  }

  async editBienPhapDT(bienPhapDT: string, id: number): Promise<BienPhapDT> {
    const result = await this.bienPhapDTRepository.query(
      `UPDATE BienPhapDTs SET BienPhapDT = N'${bienPhapDT}' WHERE MaBPDT = ${id}
        SELECT * FROM BienPhapDTs WHERE MaBPDT = ${id}
      `,
    );
    return result[0];
  }

  async deleteBienPhapDT(id: number): Promise<BienPhapDT> {
    const result = await this.bienPhapDTRepository.query(
      `SELECT * FROM BienPhapDTs WHERE MaBPDT = ${id}
			  DELETE FROM BienPhapDTs WHERE MaBPDT = ${id}
      `,
    );
    return result[0];
  }

  // ResolveField

  async DoiTuongs(MaBPDT: any): Promise<DoiTuong[]> {
    const result = (await this.bienPhapDTRepository.query(
      `SELECT * FROM BienPhapDTs_DoiTuongs WHERE MaBPDT = ${MaBPDT}`,
    )) as [{ MaDoiTuong: number }];
    const resultLoader = result.map((obj) =>
      this.dataloaderService.loaderDoiTuong.load(obj.MaDoiTuong),
    );
    return await Promise.all(resultLoader);
  }
}
