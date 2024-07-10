import { Field, InputType } from '@nestjs/graphql';
import { BaoCaoPHDCInput } from 'src/baocaoPHDCs/type/BaoCaoPHDC.Input';

@InputType()
export class SP_CHANGE_BAOCAOPHDC_Input {
  @Field({ nullable: true })
  Type?: string;

  @Field({ nullable: true })
  MaBCPHDC?: number;

  @Field({ nullable: true })
  BaoCaoPHDCInput?: BaoCaoPHDCInput;
}
