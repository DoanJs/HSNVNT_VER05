import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class KetQuaXMQuanHeInput {
  @Field({ nullable: true })
  So?: string;

  @Field({ nullable: true })
  Ngay?: string;

  @Field({ nullable: true })
  MaLanhDaoPD?: number;

  @Field({ nullable: true })
  MaBCPHQH?: number;
}
