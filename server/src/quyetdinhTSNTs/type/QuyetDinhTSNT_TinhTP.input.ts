import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QuyetDinhTSNT_TinhTPInput {
  @Field({ nullable: true })
  MaTinhTP?: number;

  @Field({ nullable: true })
  MaQD?: number;
}
