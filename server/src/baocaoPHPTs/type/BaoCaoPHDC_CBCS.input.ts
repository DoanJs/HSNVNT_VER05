import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BaoCaoPHPT_CBCSInput {
  @Field({ nullable: true })
  MaBCPHPT?: number;

  @Field({ nullable: true })
  MaCBCS?: number;
}
