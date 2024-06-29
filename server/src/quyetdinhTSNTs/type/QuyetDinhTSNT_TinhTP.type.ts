import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuyetDinhTSNT_TinhTPType {
  @Field((type) => Int)
  MaTinhTP: number;

  @Field((type) => Int)
  MaQD: number;
}
