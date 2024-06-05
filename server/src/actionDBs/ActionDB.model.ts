import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ActionDBs' })
@ObjectType()
export class ActionDB {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaActionDB' })
  @Field()
  MaActionDB: number;

  @Column({ type: 'int', nullable: true })
  @Field({ nullable: true })
  MaHistory: number;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  TableName: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  @Field({ nullable: true })
  Action: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  Time: string;

  @Column({ type: 'nvarchar', length: 'max', nullable: true })
  @Field({ nullable: true })
  Other: string;

  // relation
}
