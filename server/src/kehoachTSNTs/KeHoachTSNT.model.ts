import { Field, ObjectType } from '@nestjs/graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { LLDB } from 'src/lldbs/LLDB.model';
import { LucLuongThamGiaKH } from 'src/lltgKeHoachs/LucLuongThamGiaKH.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'KeHoachTSNTs' })
@ObjectType()
export class KeHoachTSNT {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaKH' })
  @Field()
  MaKH: number;

  @Column({ type: 'nvarchar', length: 30, nullable: true })
  @Field({ nullable: true })
  So: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  Ngay: Date;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //hash
  @Field({ nullable: true })
  VanDeChuY: string;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //hash
  @Field({ nullable: true })
  NoiDung: string;

  // relation
  @OneToOne(() => QuyetDinhTSNT, (quyetdinhTSNT) => quyetdinhTSNT.KeHoachTSNT, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaQD',
    foreignKeyConstraintName: 'FK_MaQD_KeHoachTSNT',
  })
  @Field((type) => QuyetDinhTSNT, { nullable: true })
  QuyetDinhTSNT: QuyetDinhTSNT;

  @ManyToOne(() => TramCT, (tramCT) => tramCT.KeHoachTSNTs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaTramCT',
    foreignKeyConstraintName: 'FK_MaTramCT_KeHoachTSNT',
  })
  @Field({ nullable: true })
  TramCT: TramCT;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.LanhDaoPD_KeHoachTSNTs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaLanhDaoPD',
    foreignKeyConstraintName: 'FK_MaLanhDaoPD_KeHoachTSNT',
  })
  @Field((type) => CBCS, { nullable: true })
  LanhDaoPD: CBCS;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.BCHPhuTrach_KeHoachTSNTs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaBCHPhuTrach',
    foreignKeyConstraintName: 'FK_MaBCHPhuTrach_KeHoachTSNT',
  })
  @Field((type) => CBCS, { nullable: true })
  BCHPhuTrach: CBCS;

  @ManyToMany(() => LLDB, (llbm) => llbm.KeHoachTSNTs, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'KeHoachTSNTs_LLDBs',
    joinColumn: {
      name: 'MaKH',
      foreignKeyConstraintName: 'FK_MaKH_KeHoachTSNTs_LLDBs',
    },
    inverseJoinColumn: {
      name: 'MaLLDB',
      foreignKeyConstraintName: 'FK_MaLLDB_KeHoachTSNTs_LLDBs',
    },
  })
  LLDBs: [LLDB];

  @OneToMany(
    () => LucLuongThamGiaKH,
    (lucluongthamgiaKH) => lucluongthamgiaKH.KeHoachTSNT,
  )
  LLTGKeHoachs: [LucLuongThamGiaKH];

  @OneToOne(() => KetQuaTSNT, (ketquaTSNT) => ketquaTSNT.KeHoachTSNT)
  KetQuaTSNT: KetQuaTSNT;
}
