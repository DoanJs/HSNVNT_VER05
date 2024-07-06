import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BienBanRKN_CBCSInput {
  @Field({ nullable: true })
  MaBBRKN?: number;

  @Field({ nullable: true })
  MaCBCS?: number;
}
