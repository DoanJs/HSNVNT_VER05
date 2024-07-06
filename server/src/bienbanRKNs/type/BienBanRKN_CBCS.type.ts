import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BienBanRKN_CBCSType {
  @Field((type) => Int)
  MaBBRKN: number;

  @Field((type) => Int)
  MaCBCS: number;
}
