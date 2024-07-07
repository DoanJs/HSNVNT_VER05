import { Field, ObjectType } from '@nestjs/graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'KyDuyet_DNs' })
@ObjectType()
export class KyDuyet_DN {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaKDDN' })
  @Field()
  MaKDDN: number;

  // relation
  @OneToOne(() => DeNghiTSNT, (denghiTSNT) => denghiTSNT.KyDuyet_DN, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaDN',
    foreignKeyConstraintName: 'FK_MaDN_KyDuyet_DN',
  })
  @Field((type) => DeNghiTSNT, { nullable: true })
  DeNghiTSNT: DeNghiTSNT;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.DaiDienCATTPvaTD_KyDuyet_DNs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaDaiDienCATTPvaTD',
    foreignKeyConstraintName: 'FK_MaDaiDienCATTPvaTD_KyDuyet_DN',
  })
  @Field((type) => CBCS, { nullable: true })
  DaiDienCATTPvaTD: CBCS;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.DaiDienDonViDN_KyDuyet_DNs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaDaiDienDonViDN',
    foreignKeyConstraintName: 'FK_MaDaiDienDonViDN_KyDuyet_DN',
  })
  @Field((type) => CBCS, { nullable: true })
  DaiDienDonViDN: CBCS;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.DaiDienDonViTSNT_KyDuyet_DNs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaDaiDienDonViTSNT',
    foreignKeyConstraintName: 'FK_MaDaiDienDonViTSNT_KyDuyet_DN',
  })
  @Field((type) => CBCS, { nullable: true })
  DaiDienDonViTSNT: CBCS;
}
