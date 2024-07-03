import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BaoCaoKQGH_CBCSInput {
  @Field({ nullable: true })
  MaBCKQGH?: number;

  @Field({ nullable: true })
  MaCBCS?: number;
}
