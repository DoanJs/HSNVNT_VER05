import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/accounts/Account.model';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Histories' })
@ObjectType()
export class History {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaHistory' })
  @Field()
  MaHistory: number;
  
  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  TimeLogin: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  TimeLogout: string;

  // relation
  @ManyToOne(() => Account, (account) => account.Histories, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({
    name: 'AccountID',
    foreignKeyConstraintName: 'FK_AccountID_History',
  })
  Account: Account;

  @OneToMany(() => ActionDB, actionDB => actionDB.History)
  ActionDBs: [ActionDB]
}
