import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class KetQuaTSNT_TinhTPInput {
  @Field({ nullable: true })
  MaTinhTP?: number;

  @Field({ nullable: true })
  MaKQ?: number;
}
