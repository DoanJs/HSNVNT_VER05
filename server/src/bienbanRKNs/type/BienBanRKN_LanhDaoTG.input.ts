import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BienBanRKN_LanhDaoTGInput {
  @Field({ nullable: true })
  MaBBRKN?: number;

  @Field({ nullable: true })
  MaLanhDaoTG?: number;
}
