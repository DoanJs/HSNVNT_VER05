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
import { CapCA } from 'src/capCAs/CapCA.model';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { CATTPvaTD } from './CATTPvaTD.model';
import { CATTPvaTDsService } from './CATTPvaTDs.service';
import { CATTPvaTDInput } from './type/CATTPvaTD.input';

@Resolver(() => CATTPvaTD)
@UseGuards(GraphQLGuard)
export class CATTPvaTDsResolver {
  constructor(private caTTPvaTDsService: CATTPvaTDsService) {}
  @Query((returns) => [CATTPvaTD])
  caTTPvaTDs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<CATTPvaTD[]> {
    return this.caTTPvaTDsService.caTTPvaTDs(utilsParams);
  }

  @Query((returns) => CATTPvaTD)
  caTTPvaTD(@Args('id') id: number): Promise<CATTPvaTD> {
    return this.caTTPvaTDsService.caTTPvaTD(id);
  }

  @Mutation((returns) => CATTPvaTD)
  @UseGuards(InsertGuard)
  createCATTPvaTD(
    @CurrentUser() user: any,
    @Args('caTTPvaTDInput') caTTPvaTDInput: CATTPvaTDInput,
  ): Promise<CATTPvaTD> {
    return this.caTTPvaTDsService.createCATTPvaTD(caTTPvaTDInput, user);
  }

  @Mutation((returns) => CATTPvaTD)
  @UseGuards(UpdateGuard)
  editCATTPvaTD(
    @CurrentUser() user: any,
    @Args('caTTPvaTDInput') caTTPvaTDInput: CATTPvaTDInput,
    @Args('id') id: number,
  ): Promise<CATTPvaTD> {
    return this.caTTPvaTDsService.editCATTPvaTD(caTTPvaTDInput, id, user);
  }

  @Mutation((returns) => CATTPvaTD)
  @UseGuards(DeleteGuard)
  deleteCATTPvaTD(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<CATTPvaTD> {
    return this.caTTPvaTDsService.deleteCATTPvaTD(id, user);
  }

  // ResolveField

  @ResolveField((returns) => [CAQHvaTD])
  CAQHvaTDs(@Parent() caTTPvaTD: CATTPvaTD): Promise<CAQHvaTD[]> {
    return this.caTTPvaTDsService.CAQHvaTDs(caTTPvaTD.MaCATTPvaTD);
  }

  @ResolveField((returns) => CapCA)
  CapCA(@Parent() caTTPvaTD: CATTPvaTD): Promise<CapCA> {
    return this.caTTPvaTDsService.CapCA(caTTPvaTD);
  }
}
