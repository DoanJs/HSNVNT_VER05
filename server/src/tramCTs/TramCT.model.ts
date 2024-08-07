import { Field, ObjectType } from '@nestjs/graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'TramCTs' })
@ObjectType()
export class TramCT {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_TramCT' })
  @Field()
  MaTramCT: number;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  Ngay: Date;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  DiaDiem: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  TinhHinhDB: string;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  LyLichTram: string;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  SoDoTram: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  VanDeChuY: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  QuyDinh: string;

  // relation
  @ManyToOne(() => CBCS, (cbcs) => cbcs.TSXayDung_TramCTs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaTSXayDung',
    foreignKeyConstraintName: 'FK_MaTSXayDung_TramCT',
  })
  @Field((type) => CBCS, { nullable: true })
  TSXayDung: CBCS;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.LanhDaoPD_TramCTs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaLanhDaoPD',
    foreignKeyConstraintName: 'FK_MaLanhDaoPD_TramCT',
  })
  @Field((type) => CBCS, { nullable: true })
  LanhDaoPD: CBCS;

  @OneToMany(() => KeHoachTSNT, (kehoachTSNT) => kehoachTSNT.TramCT)
  KeHoachTSNTs: [KeHoachTSNT];
}
