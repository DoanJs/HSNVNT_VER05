import { Field, ObjectType } from '@nestjs/graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { Doi } from 'src/dois/Doi.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { TinhTP } from 'src/tinhTPs/TinhTP.model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'QuyetDinhTSNTs' })
@ObjectType()
export class QuyetDinhTSNT {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaQD' })
  @Field()
  MaQD: number;

  @Column({ type: 'nvarchar', length: 30, nullable: true })
  @Field({ nullable: true })
  So: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  Ngay: Date;

  @Column({ type: 'nvarchar', length: 30, nullable: true })
  @Field({ nullable: true })
  BiDanh: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  ThoiGianBD: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  ThoiGianKT: Date;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) // crypto
  @Field({ nullable: true })
  NhiemVuCT: string;

  // relation
  @OneToOne(() => DeNghiTSNT, (denghiTSNT) => denghiTSNT.QuyetDinhTSNT, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaDN',
    foreignKeyConstraintName: 'FK_MaDN_QuyetDinhTSNT',
  })
  @Field((type) => DeNghiTSNT, { nullable: true })
  DeNghiTSNT: DeNghiTSNT;

  @ManyToOne(() => Doi, (doi) => doi.QuyetDinhTSNTs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaDoi',
    foreignKeyConstraintName: 'FK_MaDoi_QuyetDinhTSNT',
  })
  @Field((type) => Doi, { nullable: true })
  Doi: Doi;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.LanhDaoPD_QuyetDinhTSNTs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaLanhDaoPD',
    foreignKeyConstraintName: 'FK_MaLanhDaoPD_QuyetDinhTSNT',
  })
  @Field((type) => CBCS, { nullable: true })
  LanhDaoPD: CBCS;

  @ManyToMany(() => TinhTP, (tinhTP) => tinhTP.QuyetDinhTSNTs, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'QuyetDinhTSNTs_TinhTPs',
    joinColumn: {
      name: 'MaQD',
      foreignKeyConstraintName: 'FK_MaQD_QuyetDinhTSNTs_TinhTPs',
    },
    inverseJoinColumn: {
      name: 'MaTinhTP',
      foreignKeyConstraintName: 'FK_MaTinhTP_QuyetDinhTSNTs_TinhTPs',
    },
  })
  PhamViTSs: [TinhTP];

  @OneToOne(() => KeHoachTSNT, (kehoachTSNT) => kehoachTSNT.QuyetDinhTSNT)
  KeHoachTSNT: KeHoachTSNT;
}
