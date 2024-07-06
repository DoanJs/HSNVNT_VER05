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

@Entity({ name: 'DauMoiPH_DNs' })
@ObjectType()
export class DauMoiPH_DN {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaDMPH' })
  @Field()
  MaDMPH: number;

  // relation

  @ManyToOne(() => CBCS, (cbcs) => cbcs.LDDonViDN_DauMoiPHs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaLDDonViDN',
    foreignKeyConstraintName: 'FK_MaLDDonViDN_DauMoiPH',
  })
  @Field((type) => CBCS, { nullable: true })
  LDDonViDN: CBCS;
  
  @ManyToOne(() => CBCS, (cbcs) => cbcs.CBTrucTiepPH_DauMoiPHs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaCBTrucTiepPH',
    foreignKeyConstraintName: 'FK_MaCBTrucTiepPH_DauMoiPH',
  })
  @Field((type) => CBCS, { nullable: true })
  CBTrucTiepPH: CBCS;





  
  // chua duyet lai
  @OneToOne(() => DeNghiTSNT, (denghiTSNT) => denghiTSNT.DauMoiPH_DN, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaDN',
    foreignKeyConstraintName: 'FK_MaDN_DauMoiPH_DN',
  })
  DeNghiTSNT: DeNghiTSNT;


}
