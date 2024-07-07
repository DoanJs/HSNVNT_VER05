import { Field, ObjectType } from '@nestjs/graphql';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Dois' })
@ObjectType()
export class Doi {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaDoi' })
  @Field()
  MaDoi: number;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @Field({ nullable: true })
  TenDoi: string;

  // relation

  @ManyToOne(() => CAQHvaTD, (caQHvaTD) => caQHvaTD.Dois, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaCAQHvaTD',
    foreignKeyConstraintName: 'FK_MaCAQHvaTD_Doi',
  })
  @Field((type) => CAQHvaTD, { nullable: true })
  CAQHvaTD: CAQHvaTD;

  @OneToMany(() => CBCS, (cbcs) => cbcs.Doi)
  CBCSs: [CBCS];

  @OneToMany(() => QuyetDinhTSNT, (quyetdinhTSNT) => quyetdinhTSNT.Doi)
  QuyetDinhTSNTs: [QuyetDinhTSNT];
}
