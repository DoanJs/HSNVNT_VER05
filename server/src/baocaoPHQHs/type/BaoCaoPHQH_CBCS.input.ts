import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BaoCaoPHQH_CBCSInput {
  @Field({ nullable: true })
  MaBCPHQH?: number;

  @Field({ nullable: true })
  MaCBCS?: number;
}
