import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class KeHoachTSNT_LLDBInput {
  @Field({ nullable: true })
  MaLLDB?: number;

  @Field({ nullable: true })
  MaKH?: number;
}
