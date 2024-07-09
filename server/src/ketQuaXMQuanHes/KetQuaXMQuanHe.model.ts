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

@Entity({ name: 'KetQuaXMQuanHes' })
@ObjectType()
export class KetQuaXMQuanHe {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaKQXMQH' })
  @Field()
  MaKQXMQH: number;

  @Column({ type: 'nvarchar', length: 30, nullable: true })
  @Field({ nullable: true })
  So: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  Ngay: Date;

  // relation

  @OneToOne(() => BaoCaoPHQH, (baocaoPHQH) => baocaoPHQH.KetQuaXMQuanHe, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaBCPHQH',
    foreignKeyConstraintName: 'FK_MaBCPHQH_KetQuaXMQuanHe',
  })
  @Field((type) => BaoCaoPHQH, { nullable: true })
  BaoCaoPHQH: BaoCaoPHQH;

  @ManyToOne(() => CBCS, (cbcs) => cbcs.LanhDaoPD_KetQuaXMQuanHes, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaLanhDaoPD',
    foreignKeyConstraintName: 'FK_MaLanhDaoPD_KetQuaXMQuanHe',
  })
  @Field((type) => CBCS, { nullable: true })
  LanhDaoPD: CBCS;
}
