import { Field, ObjectType } from '@nestjs/graphql';
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BaoCaoKQXMDiaChi } from 'src/baocaoKQXMDiaChis/BaoCaoKQXMDiaChi.model';
import { BaoCaoKQXMQuanHe } from 'src/baocaoKQXMQuanHes/BaoCaoKQXMQuanHe.model';
import { BaoCaoKTDN } from 'src/baocaoKTDNs/BaoCaoKTDN.model';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import { BaoCaoPHPT } from 'src/baocaoPHPTs/BaoCaoPHPT.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { BienBanRKN } from 'src/bienbanRKNs/BienBanRKN.model';
import { CapBac } from 'src/capbacs/CapBac.model';
import { ChucVu } from 'src/chucvus/ChucVu.model';
import { ChuyenAn } from 'src/chuyenans/ChuyenAn.model';
import { DanhGiaTSTH } from 'src/danhgiaTSTHs/DanhGiaTSTH.model';
import { DanToc } from 'src/dantocs/DanToc.model';
import { DauMoiPH_DN } from 'src/dauMoiPH_DNs/DauMoiPH_DN.model';
import { Doi } from 'src/dois/Doi.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { KetQuaXMDiaChi } from 'src/ketQuaXMDiaChis/KetQuaXMDiaChi.model';
import { KetQuaXMQuanHe } from 'src/ketQuaXMQuanHes/KetQuaXMQuanHe.model';
import { KyDuyet_DN } from 'src/kyDuyet_DNs/KyDuyet_DN.model';
import { LLDB } from 'src/lldbs/LLDB.model';
import { LucLuongThamGiaKH } from 'src/lltgKeHoachs/LucLuongThamGiaKH.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { ThanhVienBCA } from 'src/thanhvienBCAs/ThanhVienBCA.model';
import { TonGiao } from 'src/tongiaos/TonGiao.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'CBCSs' })
@ObjectType()
export class CBCS {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaCBCS' })
  @Field()
  MaCBCS: number;

  @Column({ type: 'varbinary', length: 'max' }) //encrypt
  @Field({ nullable: true })
  HoTen: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @Field({ nullable: true })
  TenKhac: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  NgaySinh: Date;

  @Column({ type: 'int', nullable: true })
  @Field({ nullable: true })
  GioiTinh: Number;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  AnhDD: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  QueQuan: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  HKTT: string;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  NoiO: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @Field({ nullable: true })
  PhuongTien: string;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  SDT: string;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  CMCCHC: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  ThongTinChiTiet: string;

  // relation
  @ManyToOne(() => DanToc, (dantoc) => dantoc.CBCSs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaDT',
    foreignKeyConstraintName: 'FK_MaDT_CBCS',
  })
  @Field({ nullable: true })
  DanToc: DanToc;

  @ManyToOne(() => TonGiao, (tongiao) => tongiao.CBCSs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaTG',
    foreignKeyConstraintName: 'FK_MaTG_CBCS',
  })
  @Field({ nullable: true })
  TonGiao: TonGiao;

  @ManyToOne(() => Doi, (doi) => doi.CBCSs, { cascade: true, eager: true })
  @JoinColumn({
    name: 'MaDoi',
    foreignKeyConstraintName: 'FK_MaDoi_CBCS',
  })
  @Field({ nullable: true })
  Doi: Doi;

  @ManyToOne(() => CapBac, (capbac) => capbac.CBCSs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaCB',
    foreignKeyConstraintName: 'FK_MaCB_CBCS',
  })
  @Field({ nullable: true })
  CapBac: CapBac;

  @ManyToOne(() => ChucVu, (chucvu) => chucvu.CBCSs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaCV',
    foreignKeyConstraintName: 'FK_MaCV_CBCS',
  })
  @Field({ nullable: true })
  ChucVu: ChucVu;

  @OneToMany(() => KetQuaXMDiaChi, (ketquaXMDiaChi) => ketquaXMDiaChi.LanhDaoPD)
  LanhDaoPD_KetQuaXMDiaChis: [KetQuaXMDiaChi];

  @OneToMany(
    () => BaoCaoKQXMDiaChi,
    (baocaoKQXMDiaChi) => baocaoKQXMDiaChi.TSXacMinh,
  )
  TSXacMinh_BaoCaoKQXMDiaChis: [BaoCaoKQXMDiaChi];

  @ManyToMany(() => BaoCaoPHDC, (baocaoPHDC) => baocaoPHDC.TSThucHiens)
  TSThucHien_BaoCaoPHDCs: [BaoCaoPHDC];

  @OneToMany(() => BaoCaoKQGH, (baocaoKQGH) => baocaoKQGH.LanhDaoPD)
  LanhDaoPD_BaoCaoKQGHs: [BaoCaoKQGH];

  @ManyToMany(() => BienBanRKN, (bienbanRKN) => bienbanRKN.ThanhPhanTDs)
  ThanhPhanTD_BienBanRKNs: [BienBanRKN];

  @OneToMany(() => BienBanRKN, (bienbanRKN) => bienbanRKN.ThuKy)
  ThuKy_BienBanRKNs: [BienBanRKN];

  @OneToMany(() => BienBanRKN, (bienbanRKN) => bienbanRKN.ChuToa)
  ChuToa_BienBanRKNs: [BienBanRKN];

  @ManyToMany(() => BaoCaoPHQH, (baocaoPHQH) => baocaoPHQH.TSThucHiens)
  TSThucHien_BaoCaoPHQHs: [BaoCaoPHQH];

  @OneToMany(() => BaoCaoPHQH, (baocaoPHQH) => baocaoPHQH.LanhDaoPD)
  LanhDaoPD_BaoCaoPHQHs: [BaoCaoPHQH];

  @OneToMany(() => BaoCaoPHQH, (baocaoPHQH) => baocaoPHQH.ToTruongTS)
  ToTruongTS_BaoCaoPHQHs: [BaoCaoPHQH];

  @ManyToMany(() => BaoCaoPHPT, (baocaoPHPT) => baocaoPHPT.TSThucHiens)
  TSThucHien_BaoCaoPHPTs: [BaoCaoPHPT];

  @OneToMany(() => BaoCaoKTDN, (baocaoKTDN) => baocaoKTDN.CBTongHop)
  CBTongHop_BaoCaoKTDNs: [BaoCaoKTDN];

  @OneToMany(
    () => BaoCaoKQXMQuanHe,
    (baocaoKQXMQuanHe) => baocaoKQXMQuanHe.LanhDaoPD,
  )
  LanhDaoPD_BaoCaoKQXMQuanHes: [BaoCaoKQXMQuanHe];

  @OneToMany(
    () => BaoCaoKQXMQuanHe,
    (baocaoKQXMQuanHe) => baocaoKQXMQuanHe.BCHPhuTrach,
  )
  BCHPhuTrach_BaoCaoKQXMQuanHes: [BaoCaoKQXMQuanHe];

  @OneToMany(
    () => BaoCaoKQXMQuanHe,
    (baocaoKQXMQuanHe) => baocaoKQXMQuanHe.TSXacMinh,
  )
  TSXacMinh_BaoCaoKQXMQuanHes: [BaoCaoKQXMQuanHe];

  @OneToMany(
    () => BaoCaoKQXMDiaChi,
    (baocaoKQXMDiaChi) => baocaoKQXMDiaChi.LanhDaoPD,
  )
  LanhDaoPD_BaoCaoKQXMDiaChis: [BaoCaoKQXMDiaChi];

  @OneToMany(
    () => BaoCaoKQXMDiaChi,
    (baocaoKQXMDiaChi) => baocaoKQXMDiaChi.BCHPhuTrach,
  )
  BCHPhuTrach_BaoCaoKQXMDiaChis: [BaoCaoKQXMDiaChi];

  @ManyToMany(() => BaoCaoKQGH, (baocaoKQGH) => baocaoKQGH.TSThucHiens)
  TSThucHien_BaoCaoKQGHs: [BaoCaoKQGH];

  @OneToMany(() => DauMoiPH_DN, (dauMoiPH_DN) => dauMoiPH_DN.LDDonViDN)
  LDDonViDN_DauMoiPHs: [DauMoiPH_DN];

  @OneToMany(() => DauMoiPH_DN, (dauMoiPH_DN) => dauMoiPH_DN.CBTrucTiepPH)
  CBTrucTiepPH_DauMoiPHs: [DauMoiPH_DN];

  @OneToMany(() => KyDuyet_DN, (kyDuyet_DN) => kyDuyet_DN.DaiDienCATTPvaTD)
  DaiDienCATTPvaTD_KyDuyet_DNs: [KyDuyet_DN];

  @OneToMany(() => KyDuyet_DN, (kyDuyet_DN) => kyDuyet_DN.DaiDienDonViDN)
  DaiDienDonViDN_KyDuyet_DNs: [KyDuyet_DN];

  @OneToMany(() => KyDuyet_DN, (kyDuyet_DN) => kyDuyet_DN.DaiDienDonViTSNT)
  DaiDienDonViTSNT_KyDuyet_DNs: [KyDuyet_DN];

  @OneToMany(() => KeHoachTSNT, (kehoachTSNT) => kehoachTSNT.LanhDaoPD)
  LanhDaoPD_KeHoachTSNTs: [KeHoachTSNT];

  @OneToMany(() => KeHoachTSNT, (kehoachTSNT) => kehoachTSNT.BCHPhuTrach)
  BCHPhuTrach_KeHoachTSNTs: [KeHoachTSNT];

  @OneToMany(() => TramCT, (tramCT) => tramCT.TSXayDung)
  TSXayDung_TramCTs: [TramCT];

  @OneToMany(() => TramCT, (tramCT) => tramCT.LanhDaoPD)
  LanhDaoPD_TramCTs: [TramCT];

  @OneToMany(() => KetQuaXMQuanHe, (ketquaXMQuanHe) => ketquaXMQuanHe.LanhDaoPD)
  LanhDaoPD_KetQuaXMQuanHes: [KetQuaXMQuanHe];

  @OneToMany(
    () => LucLuongThamGiaKH,
    (lucluongthamgiaKH) => lucluongthamgiaKH.CBCS,
  )
  LucLuongThamGiaKHs: [LucLuongThamGiaKH];

  @OneToMany(() => DanhGiaTSTH, (danhgiaTSTH) => danhgiaTSTH.CBCS)
  DanhGiaTSTHs: [DanhGiaTSTH];

  @OneToMany(() => LLDB, (lldb) => lldb.TSQuanLy)
  TSQuanLy_LLDBs: [LLDB];

  @OneToMany(() => BaoCaoKTDN, (baocaoKTDN) => baocaoKTDN.LanhDaoPD)
  LanhDaoPD_BaoCaoKTDNs: [BaoCaoKTDN];

  @OneToMany(() => QuyetDinhTSNT, (quyetdinhTSNT) => quyetdinhTSNT.LanhDaoPD)
  LanhDaoPD_QuyetDinhTSNTs: [QuyetDinhTSNT];

  @OneToMany(() => ThanhVienBCA, (thanhvienBCA) => thanhvienBCA.CBCS)
  ThanhVienBCAs: [ThanhVienBCA];
}
