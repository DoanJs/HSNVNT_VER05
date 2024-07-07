import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { Doi } from './Doi.model';
import { DoisService } from './Dois.service';
import { DoiInput } from './type/Doi.Input';

@Resolver(() => Doi)
@UseGuards(GraphQLGuard)
export class DoisResolver {
  constructor(private doisService: DoisService) {}

  @Query((returns) => [Doi])
  dois(@Args('utilsParams') utilsParams: UtilsParamsInput): Promise<Doi[]> {
    return this.doisService.dois(utilsParams);
  }

  @Query((returns) => Doi)
  doi(@Args('id') id: number): Promise<Doi> {
    return this.doisService.doi(id);
  }

  @Mutation((returns) => Doi)
  @UseGuards(InsertGuard)
  createDoi(
    @CurrentUser() user: any,
    @Args('doiInput') doiInput: DoiInput,
  ): Promise<Doi> {
    return this.doisService.createDoi(doiInput, user);
  }

  @Mutation((returns) => Doi)
  @UseGuards(UpdateGuard)
  editDoi(
    @CurrentUser() user: any,
    @Args('doiInput') doiInput: DoiInput,
    @Args('id') id: number,
  ): Promise<Doi> {
    return this.doisService.editDoi(doiInput, id, user);
  }

  @Mutation((returns) => Doi)
  @UseGuards(DeleteGuard)
  deleteDoi(@CurrentUser() user: any, @Args('id') id: number): Promise<Doi> {
    return this.doisService.deleteDoi(id, user);
  }

  // ResolveField

  @ResolveField((returns) => CAQHvaTD)
  CAQHvaTD(@Parent() doi: Doi): Promise<CAQHvaTD> {
    return this.doisService.CAQHvaTD(doi);
  }

  @ResolveField((returns) => [CBCS])
  CBCSs(@Parent() doi: Doi): Promise<CBCS[]> {
    return this.doisService.CBCSs(doi.MaDoi);
  }

  @ResolveField((returns) => [QuyetDinhTSNT])
  QuyetDinhTSNTs(@Parent() doi: Doi): Promise<QuyetDinhTSNT[]> {
    return this.doisService.QuyetDinhTSNTs(doi.MaDoi);
  }
}
