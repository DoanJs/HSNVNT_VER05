import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChuyenAnInput {
  @Field({ nullable: true })
  BiSo?: string;

  @Field({ nullable: true })
  ThoiGianBD?: string;

  @Field({ nullable: true })
  MaTCDT?: number;

  @Field({ nullable: true })
  TenCA?: string;

  @Field({ nullable: true })
  NoiDung?: string;
}
