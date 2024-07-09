import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaoCaoPHQH_CBCSType {
  @Field((type) => Int)
  MaBCPHQH: number;

  @Field((type) => Int)
  MaCBCS: number;
}
