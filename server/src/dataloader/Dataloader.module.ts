import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import {BaoCaoPHPT} from 'src/baocaoPHPTs/BaoCaoPHPT.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { BienPhapDT } from 'src/bienPhapDTs/BienPhapDT.model';
import { BienBanRKN } from 'src/bienbanRKNs/BienBanRKN.model';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { CapCA } from 'src/capCAs/CapCA.model';
import { CapBac } from 'src/capbacs/CapBac.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { ChucVu } from 'src/chucvus/ChucVu.model';
import { DanToc } from 'src/dantocs/DanToc.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { Doi } from 'src/dois/Doi.model';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
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
import { DataLoaderService } from './Dataloader.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuocTich,
      DanToc,
      TonGiao,
      CATTPvaTD,
      CapBac,
      ChucVu,
      Doi,
      TinhChatDT,
      LoaiDT,
      CAQHvaTD,
      CBCS,
      DoiTuong,
      TinhTP,
      LoaiLLDB,
      KeHoachTSNT,
      KetQuaTSNT,
      DeNghiTSNT,
      QuyetDinhTSNT,
      BaoCaoPHQH,
      BaoCaoKQGH,
      TramCT,
      BaoCaoPHPT,
      BaoCaoPHDC,
      LLDB,
      CapCA,
      BienPhapDT,
      BienBanRKN,
    ]),
  ],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
