import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CBCSInput {
  @Field({ nullable: true })
  HoTen?: string;

  @Field({ nullable: true })
  TenKhac?: string;

  @Field({ nullable: true })
  AnhDD?: string;

  @Field({ nullable: true })
  NgaySinh?: string;

  @Field({ nullable: true })
  GioiTinh?: number;

  @Field({ nullable: true })
  QueQuan?: string;

  @Field({ nullable: true })
  HKTT?: string;

  @Field({ nullable: true })
  NoiO?: string;

  @Field({ nullable: true })
  SDT?: string;

  @Field({ nullable: true })
  CMCCHC?: string;

  @Field({ nullable: true })
  PhuongTien?: string;

  @Field({ nullable: true })
  ThongTinChiTiet?: string;

  @Field({ nullable: true })
  MaDT?: number;

  @Field({ nullable: true })
  MaTG?: number;

  @Field({ nullable: true })
  MaDoi?: number;

  @Field({ nullable: true })
  MaCB?: number;

  @Field({ nullable: true })
  MaCV?: number;
}
