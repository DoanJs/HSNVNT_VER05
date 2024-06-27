import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BienPhapDT_DoiTuongInput {
  @Field({ nullable: true })
  MaBPDT?: number;

  @Field({ nullable: true })
  MaDoiTuong?: number;
}
