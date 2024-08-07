import { Field, ObjectType } from '@nestjs/graphql';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CapCA } from 'src/capCAs/CapCA.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'CATTPvaTDs' })
@ObjectType()
export class CATTPvaTD {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaCATTPvaTD' })
  @Field()
  MaCATTPvaTD: number;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  CATTPvaTD: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @Field({ nullable: true })
  KyHieu: string;

  // relation

  @OneToMany(() => CAQHvaTD, (caQHvaTD) => caQHvaTD.CATTPvaTD)
  CAQHvaTDs: [CAQHvaTD];

  @ManyToOne(() => CapCA, (capCA) => capCA.CATTPvaTDs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaCapCA',
    foreignKeyConstraintName: 'FK_MaCapCA_CATTPvaTD',
  })
  @Field({ nullable: true })
  CapCA: CapCA;
}
