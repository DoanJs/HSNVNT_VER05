import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class KeHoachTSNT_LLDBType {
  @Field((type) => Int)
  MaLLDB: number;

  @Field((type) => Int)
  MaKH: number;
}
