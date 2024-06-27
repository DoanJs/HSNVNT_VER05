import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeNghiTSNT_TinhTPInput {
  @Field({ nullable: true })
  MaTinhTP?: number;

  @Field({ nullable: true })
  MaDN?: number;
}
