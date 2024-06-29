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
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { Doi } from 'src/dois/Doi.model';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { TinhTP } from 'src/tinhTPs/TinhTP.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { QuyetDinhTSNT } from './QuyetDinhTSNT.model';
import { QuyetDinhTSNTsService } from './QuyetDinhTSNTs.service';
import { QuyetDinhTSNTInput } from './type/QuyetDinhTSNT.input';
import { QuyetDinhTSNT_TinhTPType } from './type/QuyetDinhTSNT_TinhTP.type';
import { QuyetDinhTSNT_TinhTPInput } from './type/QuyetDinhTSNT_TinhTP.input';

@Resolver(() => QuyetDinhTSNT)
@UseGuards(GraphQLGuard)
export class QuyetDinhTSNTsResolver {
  constructor(private quyetdinhTSNTsService: QuyetDinhTSNTsService) {}
  @Query((returns) => [QuyetDinhTSNT])
  quyetdinhTSNTs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<QuyetDinhTSNT[]> {
    return this.quyetdinhTSNTsService.quyetdinhTSNTs(utilsParams);
  }

  @Query((returns) => QuyetDinhTSNT)
  quyetdinhTSNT(@Args('id') id: number): Promise<QuyetDinhTSNT> {
    return this.quyetdinhTSNTsService.quyetdinhTSNT(id);
  }

  @Mutation((returns) => QuyetDinhTSNT)
  @UseGuards(InsertGuard)
  createQuyetDinhTSNT(
    @CurrentUser() user: any,
    @Args('quyetdinhTSNTInput') quyetdinhTSNTInput: QuyetDinhTSNTInput,
  ): Promise<QuyetDinhTSNT> {
    return this.quyetdinhTSNTsService.createQuyetDinhTSNT(
      quyetdinhTSNTInput,
      user,
    );
  }

  @Mutation((returns) => QuyetDinhTSNT)
  @UseGuards(UpdateGuard)
  editQuyetDinhTSNT(
    @CurrentUser() user: any,
    @Args('id') id: number,
    @Args('quyetdinhTSNTInput') quyetdinhTSNTInput: QuyetDinhTSNTInput,
  ): Promise<QuyetDinhTSNT> {
    return this.quyetdinhTSNTsService.editQuyetDinhTSNT(
      quyetdinhTSNTInput,
      id,
      user,
    );
  }

  @Mutation((returns) => QuyetDinhTSNT)
  @UseGuards(DeleteGuard)
  deleteQuyetDinhTSNT(
    @CurrentUser() user: any,
    @Args('id') id: number,
    @Args('quyetdinhTSNTInput') quyetdinhTSNTInput: QuyetDinhTSNTInput,
  ): Promise<QuyetDinhTSNT> {
    return this.quyetdinhTSNTsService.deleteQuyetDinhTSNT(
      quyetdinhTSNTInput,
      id,
      user,
    );
  }

  // relation

  @Query((returns) => [QuyetDinhTSNT_TinhTPType])
  quyetdinhTSNTs_tinhTPs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<QuyetDinhTSNT_TinhTPType[]> {
    return this.quyetdinhTSNTsService.quyetdinhTSNTs_tinhTPs(utilsParams);
  }

  @Mutation((returns) => QuyetDinhTSNT_TinhTPType)
  @UseGuards(InsertGuard)
  createQuyetDinhTSNT_TinhTP(
    @CurrentUser() user: any,
    @Args('quyetdinhtsnt_tinhtpInput')
    quyetdinhtsnt_tinhtpInput: QuyetDinhTSNT_TinhTPInput,
  ): Promise<QuyetDinhTSNT_TinhTPType> {
    return this.quyetdinhTSNTsService.createQuyetDinhTSNT_TinhTP(
      quyetdinhtsnt_tinhtpInput,
      user,
    );
  }

  @Mutation((returns) => QuyetDinhTSNT_TinhTPType)
  @UseGuards(UpdateGuard)
  editQuyetDinhTSNT_TinhTP(
    @CurrentUser() user: any,
    @Args('quyetdinhtsnt_tinhtpInput')
    quyetdinhtsnt_tinhtpInput: QuyetDinhTSNT_TinhTPInput,
    @Args('MaTinhTP') MaTinhTP: number,
    @Args('MaQD') MaQD: number,
  ): Promise<QuyetDinhTSNT_TinhTPType> {
    return this.quyetdinhTSNTsService.editQuyetDinhTSNT_TinhTP(
      quyetdinhtsnt_tinhtpInput,
      MaTinhTP,
      MaQD,
      user,
    );
  }

  @Mutation((retursn) => QuyetDinhTSNT_TinhTPType)
  @UseGuards(DeleteGuard)
  deleteQuyetDinhTSNT_TinhTP(
    @CurrentUser() user: any,
    @Args('MaTinhTP') MaTinhTP: number,
    @Args('MaQD') MaQD: number,
  ): Promise<QuyetDinhTSNT_TinhTPType> {
    return this.quyetdinhTSNTsService.deleteQuyetDinhTSNT_TinhTP(
      MaTinhTP,
      MaQD,
      user,
    );
  }

  // ResolveField

  @ResolveField((returns) => DoiTuong)
  DoiTuong(@Parent() quyetdinhTSNT: QuyetDinhTSNT): Promise<DoiTuong> {
    return this.quyetdinhTSNTsService.DoiTuong(quyetdinhTSNT);
  }

  @ResolveField((returns) => DeNghiTSNT)
  DeNghiTSNT(@Parent() quyetdinhTSNT: QuyetDinhTSNT): Promise<DeNghiTSNT> {
    return this.quyetdinhTSNTsService.DeNghiTSNT(quyetdinhTSNT);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() quyetdinhTSNT: QuyetDinhTSNT): Promise<CBCS> {
    return this.quyetdinhTSNTsService.LanhDaoPD(quyetdinhTSNT);
  }

  @ResolveField((returns) => Doi)
  Doi(@Parent() quyetdinhTSNT: QuyetDinhTSNT): Promise<Doi> {
    return this.quyetdinhTSNTsService.Doi(quyetdinhTSNT);
  }

  @ResolveField((returns) => KeHoachTSNT)
  KeHoachTSNT(@Parent() quyetdinhTSNT: QuyetDinhTSNT): Promise<KeHoachTSNT> {
    return this.quyetdinhTSNTsService.KeHoachTSNT(quyetdinhTSNT.MaQD);
  }

  @ResolveField((returns) => CATTPvaTD)
  CATTPvaTD(@Parent() quyetdinhTSNT: QuyetDinhTSNT): Promise<CATTPvaTD> {
    return this.quyetdinhTSNTsService.CATTPvaTD(quyetdinhTSNT);
  }

  @ResolveField((returns) => CAQHvaTD)
  CAQHvaTD(@Parent() quyetdinhTSNT: QuyetDinhTSNT): Promise<CAQHvaTD> {
    return this.quyetdinhTSNTsService.CAQHvaTD(quyetdinhTSNT);
  }

  @ResolveField((returns) => [TinhTP])
  PhamViTSs(@Parent() quyetdinhTSNT: QuyetDinhTSNT): Promise<TinhTP[]> {
    return this.quyetdinhTSNTsService.PhamViTSs(quyetdinhTSNT.MaQD);
  }

  @ResolveField((returns) => KetQuaTSNT)
  KetQuaTSNT(@Parent() quyetdinhTSNT: QuyetDinhTSNT): Promise<KetQuaTSNT> {
    return this.quyetdinhTSNTsService.KetQuaTSNT(quyetdinhTSNT.MaQD);
  }
}
