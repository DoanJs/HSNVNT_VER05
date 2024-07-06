import { Field, ObjectType } from '@nestjs/graphql';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'BaoCaoKQXMQuanHes' })
@ObjectType()
export class BaoCaoKQXMQuanHe {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaBCKQXMQH' })
  @Field()
  MaBCKQXMQH: number;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  Ngay: Date;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  HoTen: string;

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

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @Field({ nullable: true })
  ChucVu: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  NoiLamViec: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  QuanHeGDXH: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  BienPhapXM: string;

  // relation

  @OneToOne(() => BaoCaoPHQH, (baocaoPHQH) => baocaoPHQH.BaoCaoKQXMQuanHe, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaBCPHQH',
    foreignKeyConstraintName: 'FK_MaBCPHQH_BaoCaoKQXMQuanHe',
  })
  @Field((type) => BaoCaoPHQH, { nullable: true })
  BaoCaoPHQH: BaoCaoPHQH;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.LanhDaoPD_BaoCaoKQXMQuanHes, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaLanhDaoPD',
    foreignKeyConstraintName: 'FK_MaLanhDaoPD_BaoCaoKQXMQuanHe',
  })
  @Field((type) => CBCS, { nullable: true })
  LanhDaoPD: CBCS;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.BCHPhuTrach_BaoCaoKQXMQuanHes, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaBCHPhuTrach',
    foreignKeyConstraintName: 'FK_MaBCHPhuTrach_BaoCaoKQXMQuanHe',
  })
  @Field((type) => CBCS, { nullable: true })
  BCHPhuTrach: CBCS;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.TSXacMinh_BaoCaoKQXMQuanHes, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaTSXacMinh',
    foreignKeyConstraintName: 'FK_MaTSXacMinh_BaoCaoKQXMQuanHe',
  })
  @Field((type) => CBCS, { nullable: true })
  TSXacMinh: CBCS;
}
