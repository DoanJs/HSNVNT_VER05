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
import { CBCS } from 'src/cbcss/CBCS.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { LLDB } from 'src/lldbs/LLDB.model';
import { LucLuongThamGiaKH } from 'src/lltgKeHoachs/LucLuongThamGiaKH.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { KeHoachTSNT } from './KeHoachTSNT.model';
import { KeHoachTSNTsService } from './KeHoachTSNTs.service';
import { KeHoachTSNTInput } from './type/KeHoachTSNT.input';
import { KeHoachTSNT_LLDBInput } from './type/KeHoachTSNT_LLDB.input';
import { KeHoachTSNT_LLDBType } from './type/KeHoachTSNT_LLDB.type';

@Resolver(() => KeHoachTSNT)
@UseGuards(GraphQLGuard)
export class KeHoachTSNTsResolver {
  constructor(private kehoachTSNTsService: KeHoachTSNTsService) {}
  @Query((returns) => [KeHoachTSNT])
  kehoachTSNTs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<KeHoachTSNT[]> {
    return this.kehoachTSNTsService.kehoachTSNTs(utilsParams);
  }

  @Query((returns) => KeHoachTSNT)
  kehoachTSNT(@Args('id') id: number): Promise<KeHoachTSNT> {
    return this.kehoachTSNTsService.kehoachTSNT(id);
  }

  @Mutation((returns) => KeHoachTSNT)
  @UseGuards(InsertGuard)
  createKeHoachTSNT(
    @CurrentUser() user: any,
    @Args('kehoachTSNTInput') kehoachTSNTInput: KeHoachTSNTInput,
  ): Promise<KeHoachTSNT> {
    return this.kehoachTSNTsService.createKeHoachTSNT(kehoachTSNTInput, user);
  }

  @Mutation((returns) => KeHoachTSNT)
  @UseGuards(UpdateGuard)
  editKeHoachTSNT(
    @CurrentUser() user: any,
    @Args('id') id: number,
    @Args('kehoachTSNTInput') kehoachTSNTInput: KeHoachTSNTInput,
  ): Promise<KeHoachTSNT> {
    return this.kehoachTSNTsService.editKeHoachTSNT(kehoachTSNTInput, id, user);
  }

  @Mutation((returns) => KeHoachTSNT)
  @UseGuards(DeleteGuard)
  deleteKeHoachTSNT(
    @CurrentUser() user: any,
    @Args('id') id: number,
    @Args('kehoachTSNTInput') kehoachTSNTInput: KeHoachTSNTInput,
  ): Promise<KeHoachTSNT> {
    return this.kehoachTSNTsService.deleteKeHoachTSNT(
      kehoachTSNTInput,
      id,
      user,
    );
  }

  // many-to-many

  @Query((returns) => [KeHoachTSNT_LLDBType])
  kehoachTSNTs_lldbs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<KeHoachTSNT_LLDBType[]> {
    return this.kehoachTSNTsService.kehoachTSNTs_lldbs(utilsParams);
  }

  @Mutation((returns) => KeHoachTSNT_LLDBType)
  @UseGuards(InsertGuard)
  createKeHoachTSNT_LLDB(
    @CurrentUser() user: any,
    @Args('kehoachtsnt_lldbInput')
    kehoachtsnt_lldbInput: KeHoachTSNT_LLDBInput,
  ): Promise<KeHoachTSNT_LLDBType> {
    return this.kehoachTSNTsService.createKeHoachTSNT_LLDB(
      kehoachtsnt_lldbInput,
      user,
    );
  }

  @Mutation((returns) => KeHoachTSNT_LLDBType)
  @UseGuards(UpdateGuard)
  editKeHoachTSNT_LLDB(
    @CurrentUser() user: any,
    @Args('kehoachtsnt_lldbInput')
    kehoachtsnt_lldbInput: KeHoachTSNT_LLDBInput,
    @Args('MaLLDB') MaLLDB: number,
    @Args('MaKH') MaKH: number,
  ): Promise<KeHoachTSNT_LLDBType> {
    return this.kehoachTSNTsService.editKeHoachTSNT_LLDB(
      kehoachtsnt_lldbInput,
      MaLLDB,
      MaKH,
      user,
    );
  }

  @Mutation((retursn) => KeHoachTSNT_LLDBType)
  @UseGuards(DeleteGuard)
  deleteKeHoachTSNT_LLDB(
    @CurrentUser() user: any,
    @Args('MaLLDB') MaLLDB: number,
    @Args('MaKH') MaKH: number,
  ): Promise<KeHoachTSNT_LLDBType> {
    return this.kehoachTSNTsService.deleteKeHoachTSNT_LLDB(MaLLDB, MaKH, user);
  }

  // ResolveField

  @ResolveField((returns) => QuyetDinhTSNT)
  QuyetDinhTSNT(@Parent() kehoachTSNT: KeHoachTSNT): Promise<QuyetDinhTSNT> {
    return this.kehoachTSNTsService.QuyetDinhTSNT(kehoachTSNT);
  }

  @ResolveField((returns) => TramCT)
  TramCT(@Parent() kehoachTSNT: KeHoachTSNT): Promise<TramCT> {
    return this.kehoachTSNTsService.TramCT(kehoachTSNT);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() kehoachTSNT: KeHoachTSNT): Promise<CBCS> {
    return this.kehoachTSNTsService.LanhDaoPD(kehoachTSNT);
  }

  @ResolveField((returns) => CBCS)
  BCHPhuTrach(@Parent() kehoachTSNT: KeHoachTSNT): Promise<CBCS> {
    return this.kehoachTSNTsService.BCHPhuTrach(kehoachTSNT);
  }

  @ResolveField((returns) => [LLDB])
  LLDBs(@Parent() kehoachTSNT: KeHoachTSNT): Promise<LLDB[]> {
    return this.kehoachTSNTsService.LLDBs(kehoachTSNT.MaKH);
  }

  @ResolveField((returns) => [LucLuongThamGiaKH])
  LLTGKeHoachs(
    @Parent() kehoachTSNT: KeHoachTSNT,
  ): Promise<LucLuongThamGiaKH[]> {
    return this.kehoachTSNTsService.LLTGKeHoachs(kehoachTSNT.MaKH);
  }

  @ResolveField((returns) => KetQuaTSNT)
  KetQuaTSNT(@Parent() kehoachTSNT: KeHoachTSNT): Promise<KetQuaTSNT> {
    return this.kehoachTSNTsService.KetQuaTSNT(kehoachTSNT.MaKH);
  }
}
