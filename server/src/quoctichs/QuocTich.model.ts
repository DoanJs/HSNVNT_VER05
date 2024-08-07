import { Field, ObjectType } from '@nestjs/graphql';
import { DanToc } from 'src/dantocs/DanToc.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'QuocTichs' })
@ObjectType()
export class QuocTich {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaQT' })
  @Field()
  MaQT: number;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @Field({ nullable: true })
  TenQT: string;

  // relation

  @OneToMany(() => DanToc, (dantoc) => dantoc.QuocTich)
  DanTocs: [DanToc];
}
