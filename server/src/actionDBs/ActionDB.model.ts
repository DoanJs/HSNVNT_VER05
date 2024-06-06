import { Field, ObjectType } from '@nestjs/graphql';
import { History } from 'src/histories/History.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ActionDBs' })
@ObjectType()
export class ActionDB {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaActionDB' })
  @Field()
  MaActionDB: number;

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
  @ManyToOne(() => History, (history) => history.ActionDBs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaHistory',
    foreignKeyConstraintName: 'FK_MaHistory_ActionDB',
  })
  History: History;
}
