import {
  Args,
  Mutation,
  Query,
  Resolver
} from '@nestjs/graphql';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BienBanRKN } from './BienBanRKN.model';
import { BienBanRKNsService } from './BienBanRKNs.service';
import { BienBanRKNInput } from './type/BienBanRKN.Input';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';

@Resolver(() => BienBanRKN)
@UseGuards(GraphQLGuard)
export class BienBanRKNsResolver {
  constructor(private bienbanRKNsService: BienBanRKNsService) { }

  @Query((returns) => [BienBanRKN])
  bienBanRKNs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BienBanRKN[]> {
    return this.bienbanRKNsService.bienBanRKNs(utilsParams);
  }

  @Query((returns) => BienBanRKN)
  bienBanRKN(@Args('id') id: number): Promise<BienBanRKN> {
    return this.bienbanRKNsService.bienBanRKN(id);
  }

  @Mutation((returns) => BienBanRKN)
  @UseGuards(InsertGuard)
  createBienBanRKN(@Args('bienbanRKNInput') bienbanRKNInput: BienBanRKNInput): Promise<BienBanRKN> {
    return this.bienbanRKNsService.createBienBanRKN(bienbanRKNInput);
  }

  @Mutation((returns) => BienBanRKN)
  @UseGuards(UpdateGuard)
  editBienBanRKN(
    @Args('bienbanRKNInput') bienbanRKNInput: BienBanRKNInput,
    @Args('id') id: number,
  ): Promise<BienBanRKN> {
    return this.bienbanRKNsService.editBienBanRKN(bienbanRKNInput, id);
  }

  @Mutation((returns) => BienBanRKN)
  @UseGuards(DeleteGuard)
  deleteBienBanRKN(
    @Args('bienbanRKNInput') bienbanRKNInput: BienBanRKNInput,
    @Args('id') id: number): Promise<BienBanRKN> {
    return this.bienbanRKNsService.deleteBienBanRKN(bienbanRKNInput, id);
  }

  //ResolveField
}
