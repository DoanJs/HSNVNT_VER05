import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Histories' })
@ObjectType()
export class History {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaHistory' })
  @Field()
  MaHistory: number;

  @Column({ type: 'int', nullable: true })
  @Field({ nullable: true })
  AccountID: number;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  TimeLogin: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  TimeLogout: string;

  // relation
}
