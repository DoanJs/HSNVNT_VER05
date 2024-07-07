import { UseGuards } from '@nestjs/common';
import {
  Args,
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
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';
import { DanToc } from 'src/dantocs/DanToc.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { QuocTich } from './QuocTich.model';
import { QuocTichsService } from './QuocTichs.service';

@Resolver(() => QuocTich)
@UseGuards(GraphQLGuard)
export class QuocTichsResolver {
  constructor(private quoctichsService: QuocTichsService) {}
  @Query((returns) => [QuocTich])
  quocTichs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<QuocTich[]> {
    return this.quoctichsService.quocTichs(utilsParams);
  }

  @Query((returns) => QuocTich)
  quocTich(@Args('id') id: number): Promise<QuocTich> {
    return this.quoctichsService.quocTich(id);
  }

  @Mutation((returns) => QuocTich)
  @UseGuards(InsertGuard)
  createQuocTich(
    @CurrentUser() user: any,
    @Args('tenQT') tenQT: string,
  ): Promise<QuocTich> {
    return this.quoctichsService.createQuocTich(tenQT, user);
  }

  @Mutation((returns) => QuocTich)
  @UseGuards(UpdateGuard)
  editQuocTich(
    @CurrentUser() user: any,
    @Args('tenQT') tenQT: string,
    @Args('id') id: number,
  ): Promise<QuocTich> {
    return this.quoctichsService.editQuocTich(tenQT, id, user);
  }

  @Mutation((returns) => QuocTich)
  @UseGuards(DeleteGuard)
  deleteQuocTich(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<QuocTich> {
    return this.quoctichsService.deleteQuocTich(id, user);
  }

  // ResolveField

  @ResolveField((returns) => [DanToc])
  DanTocs(@Parent() quoctich: QuocTich): Promise<DanToc[]> {
    return this.quoctichsService.DanTocs(quoctich.MaQT);
  }
}
