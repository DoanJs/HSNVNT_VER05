import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { ActionDB } from './ActionDB.model';
import { ActionDBsService } from './ActionDBs.service';
import { ActionDBInput } from './type/ActionDB.input';

@Resolver(() => ActionDB)
@UseGuards(GraphQLGuard)
export class ActionDBsResolver {
  constructor(private actionDBsService: ActionDBsService) {}
  @Query((returns) => [ActionDB])
  actionDBs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<ActionDB[]> {
    return this.actionDBsService.actionDBs(utilsParams);
  }

  @Query((returns) => ActionDB)
  actionDB(@Args('id') id: number): Promise<ActionDB> {
    return this.actionDBsService.actionDB(id);
  }

  @Mutation((returns) => ActionDB)
  @UseGuards(InsertGuard)
  createActionDB(
    @Args('actionDBInput') actionDBInput: ActionDBInput,
  ): Promise<ActionDB> {
    return this.actionDBsService.createActionDB(actionDBInput);
  }

  @Mutation((returns) => ActionDB)
  @UseGuards(UpdateGuard)
  editActionDB(
    @Args('actionDBInput') actionDBInput: ActionDBInput,
    @Args('id') id: number,
  ): Promise<ActionDB> {
    return this.actionDBsService.editActionDB(actionDBInput, id);
  }

  @Mutation((returns) => ActionDB)
  @UseGuards(DeleteGuard)
  deleteActionDB(@Args('id') id: number): Promise<ActionDB> {
    return this.actionDBsService.deleteActionDB(id);
  }

  //ResolveField
}
