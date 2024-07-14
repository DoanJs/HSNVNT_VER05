import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ThanhVienBCAInput {
  @Field({ nullable: true })
  BiDanh?: string;

  @Field({ nullable: true })
  ViTri?: string;

  @Field({ nullable: true })
  MaCA?: number;

  @Field({ nullable: true })
  MaCBCS?: number;
}
