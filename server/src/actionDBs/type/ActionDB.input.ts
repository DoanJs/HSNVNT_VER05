import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ActionDBInput {
  @Field({ nullable: true })
  MaHistory: number;

  @Field({ nullable: true })
  TableName: string;

  @Field({ nullable: true })
  Action: string;

  @Field({ nullable: true })
  Time: string;

  @Field({ nullable: true })
  Other: string;
}
