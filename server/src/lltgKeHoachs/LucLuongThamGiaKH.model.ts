import { Field, ObjectType } from '@nestjs/graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'LucLuongThamGiaKHs' })
@ObjectType()
export class LucLuongThamGiaKH {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaLLTGKH' })
  @Field()
  MaLLTGKH: number;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @Field({ nullable: true })
  ViTri: string;

  //relation

  @ManyToOne(() => KeHoachTSNT, (kehoachTSNT) => kehoachTSNT.LLTGKeHoachs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaKH',
    foreignKeyConstraintName: 'FK_MaKH_LucLuongThamGiaKH',
  })
  @Field((type) => KeHoachTSNT, { nullable: true })
  KeHoachTSNT: KeHoachTSNT;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.LucLuongThamGiaKHs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaCBCS',
    foreignKeyConstraintName: 'FK_MaCBCS_LucLuongThamGiaKH',
  })
  @Field((type) => CBCS, { nullable: true })
  CBCS: CBCS;
}
