import { Field, ObjectType } from '@nestjs/graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { ChuyenAn } from 'src/chuyenans/ChuyenAn.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ThanhVienBCAs' })
@ObjectType()
export class ThanhVienBCA {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaTVBCA' })
  @Field()
  MaTVBCA: number;

  @Column({ type: 'nvarchar', length: 30, nullable: true })
  @Field({ nullable: true })
  BiDanh: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  ViTri: string;

  // relation
  @ManyToOne(() => ChuyenAn, (chuyenan) => chuyenan.ThanhVienBCAs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaCA',
    foreignKeyConstraintName: 'FK_MaCA_ThanhVienBCA',
  })
  @Field((type) => ChuyenAn, { nullable: true })
  ChuyenAn: ChuyenAn;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.ThanhVienBCAs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaCBCS',
    foreignKeyConstraintName: 'FK_MaCBCS_ThanhVienBCA',
  })
  @Field((type) => CBCS, { nullable: true })
  CBCS: CBCS;
}
