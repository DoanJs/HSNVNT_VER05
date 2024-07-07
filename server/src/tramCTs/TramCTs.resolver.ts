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
import { CBCS } from 'src/cbcss/CBCS.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { TramCT } from './TramCT.model';
import { TramCTsService } from './TramCTs.service';
import { TramCTInput } from './type/TramCT.input';

@Resolver(() => TramCT)
@UseGuards(GraphQLGuard)
export class TramCTsResolver {
  constructor(private tramCTsService: TramCTsService) {}

  @Query((returns) => [TramCT])
  tramCTs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<TramCT[]> {
    return this.tramCTsService.tramCTs(utilsParams);
  }

  @Query((returns) => TramCT)
  tramCT(@Args('id') id: number): Promise<TramCT> {
    return this.tramCTsService.tramCT(id);
  }

  @Mutation((returns) => TramCT)
  @UseGuards(InsertGuard)
  createTramCT(
    @CurrentUser() user: any,
    @Args('tramCTInput') tramCTInput: TramCTInput,
  ): Promise<TramCT> {
    return this.tramCTsService.createTramCT(tramCTInput, user);
  }

  @Mutation((returns) => TramCT)
  @UseGuards(UpdateGuard)
  editTramCT(
    @CurrentUser() user: any,
    @Args('id') id: number,
    @Args('tramCTInput') tramCTInput: TramCTInput,
  ): Promise<TramCT> {
    return this.tramCTsService.editTramCT(tramCTInput, id, user);
  }

  @Mutation((returns) => TramCT)
  @UseGuards(DeleteGuard)
  deleteTramCT(
    @CurrentUser() user: any,
    @Args('id') id: number,
    @Args('tramCTInput') tramCTInput: TramCTInput,
  ): Promise<TramCT> {
    return this.tramCTsService.deleteTramCT(tramCTInput, id, user);
  }

  // ResolveField
  
  @ResolveField((returns) => CBCS)
  TSXayDung(@Parent() tramCT: TramCT): Promise<CBCS> {
    return this.tramCTsService.TSXayDung(tramCT);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() tramCT: TramCT): Promise<CBCS> {
    return this.tramCTsService.LanhDaoPD(tramCT);
  }

  @ResolveField((returns) => [KeHoachTSNT])
  KeHoachTSNTs(@Parent() tramCT: TramCT): Promise<KeHoachTSNT[]> {
    return this.tramCTsService.KeHoachTSNTs(tramCT.MaTramCT);
  }
}
