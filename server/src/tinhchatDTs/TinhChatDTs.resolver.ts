import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChuyenAn } from 'src/chuyenans/ChuyenAn.model';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { TinhChatDT } from './TinhChatDT.model';
import { TinhChatDTsService } from './TinhChatDTs.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';

@Resolver(() => TinhChatDT)
@UseGuards(GraphQLGuard)
export class TinhChatDTsResolver {
  constructor(private tinhchatDTsService: TinhChatDTsService) {}
  @Query((returns) => [TinhChatDT])
  tinhChatDTs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<TinhChatDT[]> {
    return this.tinhchatDTsService.tinhChatDTs(utilsParams);
  }

  @Query((returns) => TinhChatDT)
  tinhChatDT(@Args('id') id: number): Promise<TinhChatDT> {
    return this.tinhchatDTsService.tinhChatDT(id);
  }

  @Mutation((returns) => TinhChatDT)
  @UseGuards(InsertGuard)
  createTinhChatDT(@Args('tinhchat') tinhchat: string): Promise<TinhChatDT> {
    return this.tinhchatDTsService.createTinhChatDT(tinhchat);
  }

  @Mutation((returns) => TinhChatDT)
  @UseGuards(UpdateGuard)
  editTinhChatDT(
    @Args('tinhchat') tinhchat: string,
    @Args('id') id: number,
  ): Promise<TinhChatDT> {
    return this.tinhchatDTsService.editTinhChatDT(tinhchat, id);
  }

  @Mutation((returns) => TinhChatDT)
  @UseGuards(DeleteGuard)
  deleteTinhChatDT(@Args('id') id: number): Promise<TinhChatDT> {
    return this.tinhchatDTsService.deleteTinhChatDT(id);
  }

  // ResolveField

  @ResolveField((returns) => [DoiTuong])
  DoiTuongs(@Parent() tinhchatDT: TinhChatDT): Promise<DoiTuong[]> {
    return this.tinhchatDTsService.DoiTuongs(tinhchatDT.MaTCDT);
  }

  @ResolveField((returns) => [ChuyenAn])
  ChuyenAns(@Parent() tinhchatDT: TinhChatDT): Promise<ChuyenAn[]> {
    return this.tinhchatDTsService.ChuyenAns(tinhchatDT.MaTCDT);
  }
}
