import { Field, ObjectType } from '@nestjs/graphql';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'BaoCaoKQXMDiaChis' })
@ObjectType()
export class BaoCaoKQXMDiaChi {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaBCKQXMDC' })
  @Field()
  MaBCKQXMDC: number;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  Ngay: Date;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  HoTenChuHo: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @Field({ nullable: true })
  TenKhac: string;

  @Column({ type: 'int', nullable: true })
  @Field({ nullable: true })
  GioiTinh: number;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  NamSinh: Date;

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
  NgheNghiep: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  NoiLamViec: string;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  QuanHeGiaDinh: string;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  HoKhacCungDC: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  BienPhapXM: string;

  // relation
  @OneToOne(() => BaoCaoPHDC, (baocaoPHDC) => baocaoPHDC.BaoCaoKQXMDiaChi, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaBCPHDC',
    foreignKeyConstraintName: 'FK_MaBCPHDC_BaoCaoKQXMDiaChi',
  })
  @Field({ nullable: true })
  BaoCaoPHDC: BaoCaoPHDC;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.TSXacMinh_BaoCaoKQXMDiaChis, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaTSXacMinh',
    foreignKeyConstraintName: 'FK_MaTSXacMinh_BaoCaoKQXMDiaChi',
  })
  @Field((type) => CBCS, { nullable: true })
  TSXacMinh: CBCS;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.LanhDaoPD_BaoCaoKQXMDiaChis, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaLanhDaoPD',
    foreignKeyConstraintName: 'FK_MaLanhDaoPD_BaoCaoKQXMDiaChi',
  })
  @Field((type) => CBCS, { nullable: true })
  LanhDaoPD: CBCS;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.BCHPhuTrach_BaoCaoKQXMDiaChis, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaBCHPhuTrach',
    foreignKeyConstraintName: 'FK_MaBCHPhuTrach_BaoCaoKQXMDiaChi',
  })
  @Field((type) => CBCS, { nullable: true })
  BCHPhuTrach: CBCS;
}
