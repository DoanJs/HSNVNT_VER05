import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { LoaiDT } from './LoaiDT.model';
import { LoaiDTsService } from './LoaiDTs.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';

@Resolver(() => LoaiDT)
@UseGuards(GraphQLGuard)
export class LoaiDTsResolver {
  constructor(private loaiDTsService: LoaiDTsService) {}
  @Query((returns) => [LoaiDT])
  loaiDTs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<LoaiDT[]> {
    return this.loaiDTsService.loaiDTs(utilsParams);
  }

  @Query((returns) => LoaiDT)
  loaiDT(@Args('id') id: number): Promise<LoaiDT> {
    return this.loaiDTsService.loaiDT(id);
  }

  @Mutation((returns) => LoaiDT)
  @UseGuards(InsertGuard)
  createLoaiDT(@Args('loaiDT') loaiDT: string): Promise<LoaiDT> {
    return this.loaiDTsService.createLoaiDT(loaiDT);
  }

  @Mutation((returns) => LoaiDT)
  @UseGuards(UpdateGuard)
  editLoaiDT(
    @Args('loaiDT') loaiDT: string,
    @Args('id') id: number,
  ): Promise<LoaiDT> {
    return this.loaiDTsService.editLoaiDT(loaiDT, id);
  }

  @Mutation((returns) => LoaiDT)
  @UseGuards(DeleteGuard)
  deleteLoaiDT(@Args('id') id: number): Promise<LoaiDT> {
    return this.loaiDTsService.deleteLoaiDT(id);
  }

  // ResolveField

  @ResolveField((returns) => [DoiTuong])
  DoiTuongs(@Parent() loaiDT: LoaiDT): Promise<DoiTuong[]> {
    return this.loaiDTsService.DoiTuongs(loaiDT.MaLoaiDT);
  }
}
