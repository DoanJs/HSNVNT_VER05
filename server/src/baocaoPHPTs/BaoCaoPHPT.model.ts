import { Field, ObjectType } from '@nestjs/graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'BaoCaoPHPTs' })
@ObjectType()
export default class BaoCaoPHPT {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaBCPHPT' })
  @Field()
  MaBCPHPT: number;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  BKS: string;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  HinhAnh: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  ThoiGianPH: Date;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  DiaDiemPH: string;

  // relation
  @ManyToOne(() => KetQuaTSNT, (ketquaTSNT) => ketquaTSNT.BaoCaoPHPTs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaKQ',
    foreignKeyConstraintName: 'FK_MaKQ_BaoCaoPHPT',
  })
  @Field((type) => KetQuaTSNT, { nullable: true })
  KetQuaTSNT: KetQuaTSNT;

  @ManyToMany(() => CBCS, (cbcs) => cbcs.TSThucHien_BaoCaoPHPTs, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'BaoCaoPHPTs_CBCSs',
    joinColumn: {
      name: 'MaBCPHPT',
      foreignKeyConstraintName: 'FK_MaBCPHPT_BaoCaoPHPTs_CBCSs',
    },
    inverseJoinColumn: {
      name: 'MaCBCS',
      foreignKeyConstraintName: 'FK_MaCBCS_BaoCaoPHPTs_CBCSs',
    },
  })
  TSThucHiens: [CBCS];
}
