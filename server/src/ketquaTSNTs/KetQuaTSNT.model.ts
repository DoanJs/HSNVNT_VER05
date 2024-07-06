import { Field, ObjectType } from '@nestjs/graphql';
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BaoCaoKTDN } from 'src/baocaoKTDNs/BaoCaoKTDN.model';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import BaoCaoPHPT from 'src/baocaoPHPTs/BaoCaoPHPT.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { BienBanRKN } from 'src/bienbanRKNs/BienBanRKN.model';
import { DanhGiaTSTH } from 'src/danhgiaTSTHs/DanhGiaTSTH.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { TinhTP } from 'src/tinhTPs/TinhTP.model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'KetQuaTSNTs' })
@ObjectType()
export class KetQuaTSNT {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaKQ' })
  @Field()
  MaKQ: number;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  ThoiGianBD: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  ThoiGianKT: Date;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  DDNB: string;

  // relation
  @OneToOne(() => KeHoachTSNT, (kehoachTSNT) => kehoachTSNT.KetQuaTSNT, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaKH',
    foreignKeyConstraintName: 'FK_MaKH_KetQuaTSNT',
  })
  KeHoachTSNT: KeHoachTSNT;

  @ManyToMany(() => TinhTP, (tinhTP) => tinhTP.KetQuaTSNTs, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'KetQuaTSNTs_TinhTPs',
    joinColumn: {
      name: 'MaKQ',
      foreignKeyConstraintName: 'FK_MaKQ_KetQuaTSNTs_TinhTPs',
    },
    inverseJoinColumn: {
      name: 'MaTinhTP',
      foreignKeyConstraintName: 'FK_MaTinhTP_KetQuaTSNTs_TinhTPs',
    },
  })
  PhamViTSs: [TinhTP];




  


  @OneToMany(() => BaoCaoPHDC, (baocaoPHDC) => baocaoPHDC.KetQuaTSNT)
  BaoCaoPHDCs: [BaoCaoPHDC];
  
  @OneToMany(() => BaoCaoKQGH, (baocaoKQGH) => baocaoKQGH.KetQuaTSNT)
  BaoCaoKQGHs: [BaoCaoKQGH];
  
  @OneToOne(() => BienBanRKN, (bienbanRKN) => bienbanRKN.KetQuaTSNT)
  BienBanRKN: BienBanRKN;

  @OneToMany(() => BaoCaoPHQH, (baocaoPHQH) => baocaoPHQH)
  BaoCaoPHQHs: [BaoCaoPHQH];

  @OneToMany(() => BaoCaoPHPT, (baocaoPHPT) => baocaoPHPT.KetQuaTSNT)
  BaoCaoPHPTs: [BaoCaoPHPT];

  @OneToOne(() => BaoCaoKTDN, (baocaoKTDN) => baocaoKTDN.KetQuaTSNT)
  BaoCaoKTDN: BaoCaoKTDN;
  
  // chua duyet lai

  @OneToMany(() => DanhGiaTSTH, (danhgiaTSTH) => danhgiaTSTH.KetQuaTSNT)
  DanhGiaTSTHs: [DanhGiaTSTH];
}
