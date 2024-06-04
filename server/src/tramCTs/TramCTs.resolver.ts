import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { Doi } from 'src/dois/Doi.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { TramCT } from './TramCT.model';
import { TramCTsService } from './TramCTs.service';
import { TramCTInput } from './type/TramCT.input';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';

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
  createTramCT(@Args('tramCTInput') tramCTInput: TramCTInput): Promise<TramCT> {
    return this.tramCTsService.createTramCT(tramCTInput);
  }

  @Mutation((returns) => TramCT)
  @UseGuards(UpdateGuard)
  editTramCT(
    @Args('id') id: number,
    @Args('tramCTInput') tramCTInput: TramCTInput,
  ): Promise<TramCT> {
    return this.tramCTsService.editTramCT(tramCTInput, id);
  }

  @Mutation((returns) => TramCT)
  @UseGuards(DeleteGuard)
  deleteTramCT(
    @Args('id') id: number,
    @Args('tramCTInput') tramCTInput: TramCTInput,
  ): Promise<TramCT> {
    return this.tramCTsService.deleteTramCT(tramCTInput, id);
  }

  // ResolveField
  @ResolveField((returns) => [KeHoachTSNT])
  KeHoachTSNTs(@Parent() tramCT: TramCT): Promise<KeHoachTSNT[]> {
    return this.tramCTsService.KeHoachTSNTs(tramCT.MaTramCT);
  }

  @ResolveField((returns) => CBCS)
  TSXayDung(@Parent() tramCT: TramCT): Promise<CBCS> {
    return this.tramCTsService.TSXayDung(tramCT);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() tramCT: TramCT): Promise<CBCS> {
    return this.tramCTsService.LanhDaoPD(tramCT);
  }

  @ResolveField((returns) => CAQHvaTD)
  CAQHvaTD(@Parent() tramCT: TramCT): Promise<CAQHvaTD> {
    return this.tramCTsService.CAQHvaTD(tramCT);
  }

  @ResolveField((returns) => Doi)
  Doi(@Parent() tramCT: TramCT): Promise<Doi> {
    return this.tramCTsService.Doi(tramCT);
  }
}
