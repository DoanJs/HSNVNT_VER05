import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaoCaoPHPT_CBCSType {
  @Field((type) => Int)
  MaBCPHPT: number;

  @Field((type) => Int)
  MaCBCS: number;
}
