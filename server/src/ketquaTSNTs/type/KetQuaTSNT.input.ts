import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class KetQuaTSNTInput {
  @Field({ nullable: true })
  ThoiGianBD?: string;

  @Field({ nullable: true })
  ThoiGianKT?: string;

  @Field({ nullable: true })
  DDNB?: string;
  
  @Field({ nullable: true })
  MaKH?: number;
}
