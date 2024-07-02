import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BienBanRKNInput {
  @Field({ nullable: true })
  Ngay?: string;

  @Field({ nullable: true })
  DanhGiaLDP?: string;

  @Field({ nullable: true })
  DanhGiaTS?: string;

  @Field({ nullable: true })
  DanhGiaDT?: string;

  @Field({ nullable: true })
  KetLuan?: string;

  @Field({ nullable: true })
  DeXuat?: string;

  @Field({ nullable: true })
  MaKQ?: number;

  @Field({ nullable: true })
  MaChuToa?: number;

  @Field({ nullable: true })
  MaThuKy?: number;
}
