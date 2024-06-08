import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LLDB } from 'src/lldbs/LLDB.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { LoaiLLDB } from './LoaiLLDB.model';
import { LoaiLLDBsService } from './LoaiLLDBs.service';
import { LoaiLLDBInput } from './type/LoaiLLDB.Input';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { UseGuards } from '@nestjs/common';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';

@Resolver(() => LoaiLLDB)
@UseGuards(GraphQLGuard)
export class LoaiLLDBsResolver {
  constructor(private loaiLLDBsService: LoaiLLDBsService) {}
  @Query((returns) => [LoaiLLDB])
  loaiLLDBs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<LoaiLLDB[]> {
    return this.loaiLLDBsService.loaiLLDBs(utilsParams);
  }

  @Query((returns) => LoaiLLDB)
  loaiLLDB(@Args('id') id: number): Promise<LoaiLLDB> {
    return this.loaiLLDBsService.loaiLLDB(id);
  }

  @Mutation((returns) => LoaiLLDB)
  @UseGuards(InsertGuard)
  createLoaiLLDB(
    @CurrentUser() user: any,
    @Args('loaiLLDBInput') loaiLLDBInput: LoaiLLDBInput,
  ): Promise<LoaiLLDB> {
    return this.loaiLLDBsService.createLoaiLLDB(loaiLLDBInput, user);
  }

  @Mutation((returns) => LoaiLLDB)
  @UseGuards(UpdateGuard)
  editLoaiLLDB(
    @CurrentUser() user: any,
    @Args('loaiLLDBInput') loaiLLDBInput: LoaiLLDBInput,
    @Args('id') id: number,
  ): Promise<LoaiLLDB> {
    return this.loaiLLDBsService.editLoaiLLDB(loaiLLDBInput, id, user);
  }

  @Mutation((returns) => LoaiLLDB)
  @UseGuards(DeleteGuard)
  deleteLoaiLLDB(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<LoaiLLDB> {
    return this.loaiLLDBsService.deleteLoaiLLDB(id, user);
  }

  // ResolveField

  @ResolveField((returns) => [LLDB])
  LLDBs(@Parent() loaiLLDB: LoaiLLDB): Promise<LLDB[]> {
    return this.loaiLLDBsService.LLDBs(loaiLLDB.MaLoaiLLDB);
  }
}
