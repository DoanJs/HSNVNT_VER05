import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class HistoryInput {
  @Field({ nullable: true })
  TimeLogin?: string;

  @Field({ nullable: true })
  TimeLogout?: string;

  @Field({ nullable: true })
  AccountID?: number;
}
