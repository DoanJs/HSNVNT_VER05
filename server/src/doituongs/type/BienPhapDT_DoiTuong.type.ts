import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BienPhapDT_DoiTuongType {
  @Field((type) => Int)
  MaBPDT: number;

  @Field((type) => Int)
  MaDoiTuong: number;
}
