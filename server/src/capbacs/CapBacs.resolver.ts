import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { CapBac } from './CapBac.model';
import { CapBacsService } from './CapBacs.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';

@Resolver(() => CapBac)
@UseGuards(GraphQLGuard)
export class CapBacsResolver {
  constructor(private capbacsService: CapBacsService) { }
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
  createCapBac(@Args('capBac') capBac: string): Promise<CapBac> {
    return this.capbacsService.createCapBac(capBac);
  }

  @Mutation((returns) => CapBac)
  @UseGuards(UpdateGuard)
  editCapBac(
    @Args('capBac') capBac: string,
    @Args('id') id: number,
  ): Promise<CapBac> {
    return this.capbacsService.editCapBac(capBac, id);
  }

  @Mutation((returns) => CapBac)
  @UseGuards(DeleteGuard)
  deleteCapBac(@Args('id') id: number): Promise<CapBac> {
    return this.capbacsService.deleteCapBac(id);
  }

  //ResolveField

  @ResolveField(returns => [CBCS])
  CBCSs(@Parent() capbac: CapBac): Promise<CBCS[]> {
    return this.capbacsService.CBCSs(capbac.MaCB);
  }
}
