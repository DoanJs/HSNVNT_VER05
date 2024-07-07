import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class KetQuaXMDiaChiInput {
  @Field({ nullable: true })
  So?: string;

  @Field({ nullable: true })
  Ngay?: string;

  @Field({ nullable: true })
  MaBCPHDC?: number;

  @Field({ nullable: true })
  MaLanhDaoPD?: number;
}
