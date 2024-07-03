import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BienBanRKN_LanhDaoTGType {
  @Field((type) => Int)
  MaBBRKN: number;

  @Field((type) => Int)
  MaLanhDaoTG: number;
}
