import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { HistoriesService } from './Histories.service';
import { History } from './History.model';
import { HistoryInput } from './type/History.input';

@Resolver(() => History)
@UseGuards(GraphQLGuard)
export class HistoriesResolver {
  constructor(private historiesService: HistoriesService) {}
  @Query((returns) => [History])
  histories(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<History[]> {
    return this.historiesService.histories(utilsParams);
  }

  @Query((returns) => History)
  history(@Args('id') id: number): Promise<History> {
    return this.historiesService.history(id);
  }

  @Mutation((returns) => History)
  @UseGuards(InsertGuard)
  createHistory(
    @Args('historyInput') historyInput: HistoryInput,
  ): Promise<History> {
    return this.historiesService.createHistory(historyInput);
  }

  @Mutation((returns) => History)
  @UseGuards(UpdateGuard)
  editHistory(
    @Args('historyInput') historyInput: HistoryInput,
    @Args('id') id: number,
  ): Promise<History> {
    return this.historiesService.editHistory(historyInput, id);
  }

  @Mutation((returns) => History)
  @UseGuards(DeleteGuard)
  deleteHistory(@Args('id') id: number): Promise<History> {
    return this.historiesService.deleteHistory(id);
  }

  //ResolveField
}
