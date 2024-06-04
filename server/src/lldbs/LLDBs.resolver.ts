import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CBCS } from 'src/cbcss/CBCS.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { LoaiLLDB } from 'src/loaiLLDBs/LoaiLLDB.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { LLDB } from './LLDB.model';
import { LLDBsService } from './LLDBs.service';
import { LLDBInput } from './type/LLDB.Input';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { UseGuards } from '@nestjs/common';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';

@Resolver(() => LLDB)
@UseGuards(GraphQLGuard)
export class LLDBsResolver {
  constructor(private lldbsService: LLDBsService) {}

  @Query((returns) => [LLDB])
  lldbs(@Args('utilsParams') utilsParams: UtilsParamsInput): Promise<LLDB[]> {
    return this.lldbsService.lldbs(utilsParams);
  }

  @Query((returns) => LLDB)
  lldb(@Args('id') id: number): Promise<LLDB> {
    return this.lldbsService.lldb(id);
  }

  @Mutation((returs) => LLDB)
  @UseGuards(InsertGuard)
  createLLDB(@Args('lldbInput') lldbInput: LLDBInput): Promise<LLDB> {
    return this.lldbsService.createLLDB(lldbInput);
  }

  @Mutation((returns) => LLDB)
  @UseGuards(UpdateGuard)
  editLLDB(
    @Args('lldbInput') lldbInput: LLDBInput,
    @Args('id') id: number,
  ): Promise<LLDB> {
    return this.lldbsService.editLLDB(lldbInput, id);
  }

  @Mutation((returns) => LLDB)
  @UseGuards(DeleteGuard)
  deleteLLDB(@Args('id') id: number): Promise<LLDB> {
    return this.lldbsService.deleteLLDB(id);
  }

  // ResolveField

  @ResolveField((returns) => LoaiLLDB)
  LoaiLLDB(@Parent() lldb: LLDB): Promise<LoaiLLDB> {
    return this.lldbsService.LoaiLLDB(lldb);
  }

  @ResolveField((returns) => [KeHoachTSNT])
  KeHoachTSNTs(@Parent() lldb: LLDB): Promise<KeHoachTSNT[]> {
    return this.lldbsService.KeHoachTSNTs(lldb.MaLLDB);
  }

  @ResolveField((returns) => CBCS)
  TSQuanLy(@Parent() lldb: LLDB): Promise<CBCS> {
    return this.lldbsService.TSQuanLy(lldb);
  }
}
