import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeNghiTSNT_TinhTPType {
  @Field((type) => Int)
  MaTinhTP: number;

  @Field((type) => Int)
  MaDN: number;
}
