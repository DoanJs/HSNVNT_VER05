import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { CapCA } from './CapCA.model';
import { CapCAsService } from './CapCAs.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';

@Resolver(() => CapCA)
@UseGuards(GraphQLGuard)
export class CapCAsResolver {
  constructor(private capCAsService: CapCAsService) {}

  @Query((returns) => [CapCA])
  capCAs(@Args('utilsParams') utilsParams: UtilsParamsInput): Promise<CapCA[]> {
    return this.capCAsService.capCAs(utilsParams);
  }

  @Query((returns) => CapCA)
  capCA(@Args('id') id: number): Promise<CapCA> {
    return this.capCAsService.capCA(id);
  }

  @Mutation((returns) => CapCA)
  @UseGuards(InsertGuard)
  createCapCA(
    @CurrentUser() user: any,
    @Args('capCA') capCA: string,
  ): Promise<CapCA> {
    return this.capCAsService.createCapCA(capCA, user);
  }

  @Mutation((returns) => CapCA)
  @UseGuards(UpdateGuard)
  editCapCA(
    @CurrentUser() user: any,
    @Args('capCA') capCA: string,
    @Args('id') id: number,
  ): Promise<CapCA> {
    return this.capCAsService.editCapCA(capCA, id, user);
  }

  @Mutation((returns) => CapCA)
  @UseGuards(DeleteGuard)
  deleteCapCA(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<CapCA> {
    return this.capCAsService.deleteCapCA(id, user);
  }

  //ResolveField

  @ResolveField((returns) => [CATTPvaTD])
  CATTPvaTDs(@Parent() capCA: CapCA): Promise<CATTPvaTD[]> {
    return this.capCAsService.CATTPvaTDs(capCA.MaCapCA);
  }
}
