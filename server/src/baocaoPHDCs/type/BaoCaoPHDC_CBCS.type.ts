import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaoCaoPHDC_CBCSType {
  @Field((type) => Int)
  MaBCPHDC: number;

  @Field((type) => Int)
  MaCBCS: number;
}
