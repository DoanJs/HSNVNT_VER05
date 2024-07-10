import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BaoCaoPHDC_CBCSInput {
  @Field({ nullable: true })
  MaBCPHDC?: number;

  @Field({ nullable: true })
  MaCBCS?: number;
}
