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
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BaoCaoKQXMDiaChi } from 'src/baocaoKQXMDiaChis/BaoCaoKQXMDiaChi.model';
import { BaoCaoKQXMQuanHe } from 'src/baocaoKQXMQuanHes/BaoCaoKQXMQuanHe.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { Doi } from 'src/dois/Doi.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { CAQHvaTD } from './CAQHvaTD.model';
import { CAQHvaTDsService } from './CAQHvaTDs.service';
import { CAQHvaTDInput } from './type/CAQHvaTD.Input';
import { CapCA } from 'src/capCAs/CapCA.model';

@Resolver(() => CAQHvaTD)
@UseGuards(GraphQLGuard)
export class CAQHvaTDsResolver {
  constructor(private caQHvaTDsService: CAQHvaTDsService) {}
  @Query((returns) => [CAQHvaTD])
  caQHvaTDs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<CAQHvaTD[]> {
    return this.caQHvaTDsService.caQHvaTDs(utilsParams);
  }

  @Query((returns) => CAQHvaTD)
  caQHvaTD(@Args('id') id: number): Promise<CAQHvaTD> {
    return this.caQHvaTDsService.caQHvaTD(id);
  }

  @Mutation((returs) => CAQHvaTD)
  @UseGuards(InsertGuard)
  createCAQHvaTD(
    @CurrentUser() user: any,
    @Args('caQHvaTDInput') caQHvaTDInput: CAQHvaTDInput,
  ): Promise<CAQHvaTD> {
    return this.caQHvaTDsService.createCAQHvaTD(caQHvaTDInput, user);
  }

  @Mutation((returns) => CAQHvaTD)
  @UseGuards(UpdateGuard)
  editCAQHvaTD(
    @CurrentUser() user: any,
    @Args('caQHvaTDInput') caQHvaTDInput: CAQHvaTDInput,
    @Args('id') id: number,
  ): Promise<CAQHvaTD> {
    return this.caQHvaTDsService.editCAQHvaTD(caQHvaTDInput, id, user);
  }

  @Mutation((returns) => CAQHvaTD)
  @UseGuards(DeleteGuard)
  deleteCAQHvaTD(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<CAQHvaTD> {
    return this.caQHvaTDsService.deleteCAQHvaTD(id, user);
  }

  // ResolveField

  @ResolveField((returns) => CATTPvaTD)
  CATTPvaTD(@Parent() caQHvaTD: CAQHvaTD): Promise<CATTPvaTD> {
    return this.caQHvaTDsService.CATTPvaTD(caQHvaTD);
  }

  @ResolveField((returns) => CapCA)
  CapCA(@Parent() caQHvaTD: CAQHvaTD): Promise<CapCA> {
    return this.caQHvaTDsService.CapCA(caQHvaTD);
  }

  @ResolveField((returns) => [DeNghiTSNT])
  DeNghiTSNTs(@Parent() CAQHvaTD: CAQHvaTD): Promise<DeNghiTSNT[]> {
    return this.caQHvaTDsService.DeNghiTSNTs(CAQHvaTD.MaCAQHvaTD);
  }


  @ResolveField((returns) => [Doi])
  Dois(@Parent() caQHvaTD: CAQHvaTD): Promise<Doi[]> {
    return this.caQHvaTDsService.Dois(caQHvaTD.MaCAQHvaTD);
  }
}
