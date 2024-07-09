import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class KetQuaTSNT_TinhTPType {
  @Field((type) => Int)
  MaTinhTP: number;

  @Field((type) => Int)
  MaKQ: number;
}
