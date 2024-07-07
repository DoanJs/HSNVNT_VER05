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

@Entity({ name: 'KetQuaXMDiaChis' })
@ObjectType()
export class KetQuaXMDiaChi {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaKQXMDC' })
  @Field()
  MaKQXMDC: number;

  @Column({ type: 'nvarchar', length: 30, nullable: true })
  @Field({ nullable: true })
  So: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  Ngay: string;

  // relation

  @OneToOne(() => BaoCaoPHDC, (baocaoPHDC) => baocaoPHDC.KetQuaXMDiaChi, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaBCPHDC',
    foreignKeyConstraintName: 'FK_MaBCPHDC_KetQuaXMDiaChi',
  })
  @Field((type) => BaoCaoPHDC, { nullable: true })
  BaoCaoPHDC: BaoCaoPHDC;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.LanhDaoPD_KetQuaXMDiaChis, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaLanhDaoPD',
    foreignKeyConstraintName: 'FK_MaLanhDaoPD_KetQuaXMDiaChi',
  })
  @Field((type) => CBCS, { nullable: true })
  LanhDaoPD: CBCS;
}
