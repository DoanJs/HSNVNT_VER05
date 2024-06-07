import {
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  GqlExecutionContext,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { CBCS } from 'src/cbcss/CBCS.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { CapBac } from './CapBac.model';
import { CapBacsService } from './CapBacs.service';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';

@Resolver(() => CapBac)
@UseGuards(GraphQLGuard)
export class CapBacsResolver {
  constructor(private capbacsService: CapBacsService) {}
  @Query((returns) => [CapBac])
  capbacs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<CapBac[]> {
    return this.capbacsService.capbacs(utilsParams);
  }

  @Query((returns) => CapBac)
  capbac(@Args('id') id: number): Promise<CapBac> {
    return this.capbacsService.capbac(id);
  }

  @Mutation((returns) => CapBac)
  @UseGuards(InsertGuard)
  createCapBac(
    @CurrentUser() user: any,
    @Args('capBac') capBac: string,
  ): Promise<CapBac> {
    return this.capbacsService.createCapBac(capBac, user);
  }

  @Mutation((returns) => CapBac)
  @UseGuards(UpdateGuard)
  editCapBac(
    @CurrentUser() user: any,
    @Args('capBac') capBac: string,
    @Args('id') id: number,
  ): Promise<CapBac> {
    return this.capbacsService.editCapBac(capBac, id, user);
  }

  @Mutation((returns) => CapBac)
  @UseGuards(DeleteGuard)
  deleteCapBac(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<CapBac> {
    return this.capbacsService.deleteCapBac(id, user);
  }

  //ResolveField

  @ResolveField((returns) => [CBCS])
  CBCSs(@Parent() capbac: CapBac): Promise<CBCS[]> {
    return this.capbacsService.CBCSs(capbac.MaCB);
  }
}
