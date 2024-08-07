import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DoiTuongInput {
  @Field({ nullable: true })
  TenDT?: string;

  @Field({ nullable: true })
  TenKhac?: string;

  @Field({ nullable: true })
  GioiTinh?: number;

  @Field({ nullable: true })
  NgaySinh?: string;

  @Field({ nullable: true })
  NoiSinh?: string;

  @Field({ nullable: true })
  CMCCHC?: string;

  @Field({ nullable: true })
  AnhDD?: string;

  @Field({ nullable: true })
  QueQuan?: string;

  @Field({ nullable: true })
  HKTT?: string;

  @Field({ nullable: true })
  NoiO?: string;  

  @Field({ nullable: true })
  NgheNghiep?: string;

  @Field({ nullable: true })
  ChucVu?: string;

  @Field({ nullable: true })
  NoiLamViec?: string;

  @Field({ nullable: true })
  PhuongTien?: string;

  @Field({ nullable: true })
  SDT?: string; 

  @Field({ nullable: true })
  ThongTinKhac?: string;
  

  @Field({ nullable: true })
  MaDT?: number;

  @Field({ nullable: true })
  MaTG?: number;

  @Field({ nullable: true })
  MaTCDT?: number;

  @Field({ nullable: true })
  MaLoai?: number;
}
