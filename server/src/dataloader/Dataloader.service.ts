import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { CapBac } from 'src/capbacs/CapBac.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { ChucVu } from 'src/chucvus/ChucVu.model';
import { DanToc } from 'src/dantocs/DanToc.model';
import { DDNB } from 'src/ddnbs/DDNB.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { Doi } from 'src/dois/Doi.model';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { LLDB } from 'src/lldbs/LLDB.model';
import { LoaiDT } from 'src/loaiDTs/LoaiDT.model';
import { LoaiLLDB } from 'src/loaiLLDBs/LoaiLLDB.model';
import { QuocTich } from 'src/quoctichs/QuocTich.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TinhTP } from 'src/tinhTPs/TinhTP.model';
import { TinhChatDT } from 'src/tinhchatDTs/TinhChatDT.model';
import { TonGiao } from 'src/tongiaos/TonGiao.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import { SP_GET_DATA_DECRYPT } from 'src/utils/mssql/query';
import { Repository } from 'typeorm';
import { CapCA } from 'src/capCAs/CapCA.model';
import { BienPhapDT } from 'src/bienPhapDTs/BienPhapDT.model';
import PhuongTienNV from 'src/phuongtienNVs/PhuongTienNV.model';
import { DiaChiNV } from 'src/diachiNVs/DiaChiNV.model';

@Injectable()
export class DataLoaderService {
  constructor(
    @InjectRepository(QuocTich)
    private readonly quoctichRepository: Repository<QuocTich>,
    @InjectRepository(DanToc)
    private readonly dantocRepository: Repository<DanToc>,
    @InjectRepository(TonGiao)
    private readonly tongiaoRepository: Repository<TonGiao>,
    @InjectRepository(CAQHvaTD)
    private readonly caQHvaTDRepository: Repository<CAQHvaTD>,
    @InjectRepository(CapBac)
    private readonly capbacRepository: Repository<CapBac>,
    @InjectRepository(ChucVu)
    private readonly chucvuRepository: Repository<ChucVu>,
    @InjectRepository(Doi)
    private readonly doiRepository: Repository<Doi>,
    @InjectRepository(TinhChatDT)
    private readonly tinhchatRepository: Repository<TinhChatDT>,
    @InjectRepository(LoaiDT)
    private readonly loaiDTRepository: Repository<LoaiDT>,
    @InjectRepository(CATTPvaTD)
    private readonly caTTPvaTDRepository: Repository<CATTPvaTD>,
    @InjectRepository(CBCS)
    private readonly cbcsRepository: Repository<CBCS>,
    @InjectRepository(DoiTuong)
    private readonly doituongRepository: Repository<DoiTuong>,
    @InjectRepository(DDNB)
    private readonly ddnbRepository: Repository<DDNB>,
    @InjectRepository(TinhTP)
    private readonly tinhTPRepository: Repository<TinhTP>,
    @InjectRepository(LoaiLLDB)
    private readonly loaiLLDBRepository: Repository<LoaiLLDB>,
    @InjectRepository(KeHoachTSNT)
    private readonly kehoachTSNTRepository: Repository<KeHoachTSNT>,
    @InjectRepository(KetQuaTSNT)
    private readonly ketquaTSNTRepository: Repository<KetQuaTSNT>,
    @InjectRepository(DeNghiTSNT)
    private readonly denghiTSNTRepository: Repository<DeNghiTSNT>,
    @InjectRepository(QuyetDinhTSNT)
    private readonly quyetdinhTSNTRepository: Repository<QuyetDinhTSNT>,
    @InjectRepository(BaoCaoPHQH)
    private readonly baocaoPHQHRepository: Repository<BaoCaoPHQH>,
    @InjectRepository(BaoCaoKQGH)
    private readonly baocaoKQGHRepository: Repository<BaoCaoKQGH>,
    @InjectRepository(TramCT)
    private readonly tramCTRepository: Repository<TramCT>,
    @InjectRepository(PhuongTienNV)
    private readonly phuongtienNVRepository: Repository<PhuongTienNV>,
    @InjectRepository(DiaChiNV)
    private readonly diachiNVRepository: Repository<DiaChiNV>,
    @InjectRepository(LLDB)
    private readonly lldbRepository: Repository<LLDB>,
    @InjectRepository(CapCA)
    private readonly capCARepository: Repository<CapCA>,
    @InjectRepository(BienPhapDT)
    private readonly bienPhapDTRepository: Repository<BienPhapDT>,
  ) {}
  public readonly loaderQuocTich = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.quoctichRepository.query(
        `SELECT * FROM QuocTichs WHERE MaQT = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderDanToc = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.dantocRepository.query(
        `SELECT * FROM DanTocs WHERE MaDT = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderTonGiao = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.tongiaoRepository.query(
        `SELECT * FROM TonGiaos WHERE MaTG = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderCAQHvaTD = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.caQHvaTDRepository.query(
        `SELECT * FROM CAQHvaTDs WHERE MaCAQHvaTD = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderCapBac = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.capbacRepository.query(
        `SELECT * FROM CapBacs WHERE MaCB = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderChucVu = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.chucvuRepository.query(
        `SELECT * FROM ChucVus WHERE MaCV = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderDoi = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.doiRepository.query(
        `SELECT * FROM Dois WHERE MaDoi = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderTinhChat = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.tinhchatRepository.query(
        `SELECT * FROM TinhChatDTs WHERE MaTCDT = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderLoaiDT = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.loaiDTRepository.query(
        `SELECT * FROM LoaiDTs WHERE MaLoaiDT = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderCATTPvaTD = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.caTTPvaTDRepository.query(
        `SELECT * FROM CATTPvaTDs WHERE MaCATTPvaTD = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderCBCS = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.cbcsRepository.query(
        SP_GET_DATA_DECRYPT('CBCSs', `'MaCBCS = ${id}'`, 0, 0)
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderHinhThucHD = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.cbcsRepository.query(
        `SELECT * FROM HinhThucHDs WHERE MaHTHD = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderChuyenAn = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.cbcsRepository.query(
        SP_GET_DATA_DECRYPT('ChuyenAns',`'MaCA = ${id}'`, 0, 0)
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderDoiTuong = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.doituongRepository.query(
        SP_GET_DATA_DECRYPT('DoiTuongs',`'MaDoiTuong = ${id}'`, 0, 0)
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderDDNB = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.ddnbRepository.query(
        `SELECT * FROM DDNBs WHERE MaDDNB = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderTinhTP = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.tinhTPRepository.query(
        `SELECT * FROM TinhTPs WHERE MaTinhTP = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderLoaiLLDB = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.loaiLLDBRepository.query(
        `SELECT * FROM LoaiLLDBs WHERE MaLoaiLLDB = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderKeHoachTSNT = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.kehoachTSNTRepository.query(
        SP_GET_DATA_DECRYPT('KeHoachTSNTs',`'MaKH = ${id}'`, 0, 0)
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderKetQuaTSNT = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.lldbRepository.query(
        `SELECT * FROM KetQuaTSNTs WHERE MaKQ = ${id}`
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderDeNghiTSNT = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.denghiTSNTRepository.query(
        SP_GET_DATA_DECRYPT('DeNghiTSNTs',`'MaDN = ${id}'`, 0, 0)
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderQuyetDinhTSNT = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.quyetdinhTSNTRepository.query(
        SP_GET_DATA_DECRYPT('QuyetDinhTSNTs',`'MaQD = ${id}'`, 0, 0)
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderBaoCaoPHQH = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.baocaoPHQHRepository.query(
        SP_GET_DATA_DECRYPT('BaoCaoPHQHs',`'MaBCPHQH = ${id}'`, 0, 0)
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderBaoCaoKQGH = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.baocaoKQGHRepository.query(
        SP_GET_DATA_DECRYPT('BaoCaoKQGHs',`'MaBCKQGH = ${id}'`, 0, 0)
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderTramCT = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.tramCTRepository.query(
        SP_GET_DATA_DECRYPT('TramCTs',`'MaTramCT = ${id}'`, 0, 0)
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderPhuongTienNV = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.phuongtienNVRepository.query(
        SP_GET_DATA_DECRYPT('PhuongTienNVs', `"MaPT = ${id}"`, 0, 0),
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderDiaChiNV = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.diachiNVRepository.query(
        SP_GET_DATA_DECRYPT('DiaChiNVs', `"MaDC = ${id}"`, 0, 0),
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderLLDB = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.lldbRepository.query(
        `SELECT * FROM LLDBs WHERE MaLLDB = ${id}`
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderCapCA = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.capCARepository.query(
        `SELECT * FROM CapCAs WHERE MaCapCA = ${id}`
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
  public readonly loaderBienPhapDT = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.bienPhapDTRepository.query(
        `SELECT * FROM BienPhapDTs WHERE MaBPDT = ${id}`
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
}
