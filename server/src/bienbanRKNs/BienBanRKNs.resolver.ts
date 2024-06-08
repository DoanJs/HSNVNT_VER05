import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BienBanRKN } from './BienBanRKN.model';
import { BienBanRKNsService } from './BienBanRKNs.service';
import { BienBanRKNInput } from './type/BienBanRKN.Input';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';

@Resolver(() => BienBanRKN)
@UseGuards(GraphQLGuard)
export class BienBanRKNsResolver {
  constructor(private bienbanRKNsService: BienBanRKNsService) {}

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
  createBienBanRKN(
    @CurrentUser() user: any,
    @Args('bienbanRKNInput') bienbanRKNInput: BienBanRKNInput,
  ): Promise<BienBanRKN> {
    return this.bienbanRKNsService.createBienBanRKN(bienbanRKNInput, user);
  }

  @Mutation((returns) => BienBanRKN)
  @UseGuards(UpdateGuard)
  editBienBanRKN(
    @CurrentUser() user: any,
    @Args('bienbanRKNInput') bienbanRKNInput: BienBanRKNInput,
    @Args('id') id: number,
  ): Promise<BienBanRKN> {
    return this.bienbanRKNsService.editBienBanRKN(bienbanRKNInput, id, user);
  }

  @Mutation((returns) => BienBanRKN)
  @UseGuards(DeleteGuard)
  deleteBienBanRKN(
    @CurrentUser() user: any,
    @Args('bienbanRKNInput') bienbanRKNInput: BienBanRKNInput,
    @Args('id') id: number,
  ): Promise<BienBanRKN> {
    return this.bienbanRKNsService.deleteBienBanRKN(bienbanRKNInput, id, user);
  }

  //ResolveField
}
