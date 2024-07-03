import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaoCaoKQGH_CBCSType {
  @Field((type) => Int)
  MaBCKQGH: number;

  @Field((type) => Int)
  MaCBCS: number;
}
