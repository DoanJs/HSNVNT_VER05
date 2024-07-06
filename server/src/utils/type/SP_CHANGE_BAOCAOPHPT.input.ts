import { Field, InputType } from "@nestjs/graphql";
import { BaoCaoPHPTInput } from "src/baocaoPHPTs/type/BaoCaoPHPT.input";

@InputType()
export class SP_CHANGE_BAOCAOPHPT_Input {
    @Field({ nullable: true })
    Type?: string;
  
    @Field({ nullable: true })
    MaBCPHPT?: number;
  
    @Field({ nullable: true })
    BaoCaoPHPTInput?: BaoCaoPHPTInput;
}