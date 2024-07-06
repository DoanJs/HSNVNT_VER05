import { Field, ObjectType } from '@nestjs/graphql';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'CapCAs' })
@ObjectType()
export class CapCA {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaCapCA' })
  @Field()
  MaCapCA: number;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  CapCA: string;

  // relation

  @OneToMany(() => CATTPvaTD, (caTTPvaTD) => caTTPvaTD.CapCA)
  CATTPvaTDs: [CATTPvaTD];

  @OneToMany(() => CAQHvaTD, (caQHvaTD) => caQHvaTD.CapCA)
  CAQHvaTDs: [CAQHvaTD];
}
