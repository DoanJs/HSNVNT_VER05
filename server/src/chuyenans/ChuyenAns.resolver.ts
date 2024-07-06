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
import { DoiTuongCA } from 'src/doituongCAs/DoiTuongCA.model';
import { TinhChatDT } from 'src/tinhchatDTs/TinhChatDT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { ChuyenAn } from './ChuyenAn.model';
import { ChuyenAnsService } from './ChuyenAns.service';
import { ChuyenAnInput } from './type/ChuyenAn.input';

@Resolver(() => ChuyenAn)
@UseGuards(GraphQLGuard)
export class ChuyenAnsResolver {
  constructor(private chuyenansService: ChuyenAnsService) {}
  @Query((returns) => [ChuyenAn])
  chuyenans(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<ChuyenAn[]> {
    return this.chuyenansService.chuyenans(utilsParams);
  }

  @Query((returns) => ChuyenAn)
  chuyenan(@Args('id') id: number): Promise<ChuyenAn> {
    return this.chuyenansService.chuyenan(id);
  }

  @Mutation((returns) => ChuyenAn)
  @UseGuards(InsertGuard)
  createChuyenAn(
    @CurrentUser() user: any,
    @Args('chuyenanInput') chuyenanInput: ChuyenAnInput,
  ): Promise<ChuyenAn> {
    return this.chuyenansService.createChuyenAn(chuyenanInput, user);
  }

  @Mutation((returns) => ChuyenAn)
  @UseGuards(UpdateGuard)
  editChuyenAn(
    @CurrentUser() user: any,
    @Args('chuyenanInput') chuyenanInput: ChuyenAnInput,
    @Args('id') id: number,
  ): Promise<ChuyenAn> {
    return this.chuyenansService.editChuyenAn(chuyenanInput, id, user);
  }

  @Mutation((returns) => ChuyenAn)
  @UseGuards(DeleteGuard)
  deleteChuyenAn(
    @CurrentUser() user: any,
    @Args('chuyenanInput') chuyenanInput: ChuyenAnInput,
    @Args('id') id: number,
  ): Promise<ChuyenAn> {
    return this.chuyenansService.deleteChuyenAn(chuyenanInput, id, user);
  }

  // ResolveField

  @ResolveField((returns) => TinhChatDT)
  TinhChatDT(@Parent() chuyenan: ChuyenAn): Promise<TinhChatDT> {
    return this.chuyenansService.TinhChatDT(chuyenan);
  }

  @ResolveField((returns) => [DoiTuongCA])
  DoiTuongCAs(@Parent() chuyenan: ChuyenAn): Promise<DoiTuongCA[]> {
    return this.chuyenansService.DoiTuongCAs(chuyenan.MaCA);
  }
}
