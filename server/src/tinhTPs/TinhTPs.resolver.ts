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
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { TinhTP } from './TinhTP.model';
import { TinhTPsService } from './TinhTPs.service';
import { TinhTPInput } from './type/TinhTP.Input';

@Resolver(() => TinhTP)
@UseGuards(GraphQLGuard)
export class TinhTPsResolver {
  constructor(private tinhTPsService: TinhTPsService) {}
  @Query((returns) => [TinhTP])
  tinhTPs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
    @CurrentUser() user: any,
  ): Promise<TinhTP[]> {
    return this.tinhTPsService.tinhTPs(utilsParams, user);
  }

  @Query((returns) => TinhTP)
  tinhTP(@Args('id') id: number): Promise<TinhTP> {
    return this.tinhTPsService.tinhTP(id);
  }

  @Mutation((returns) => TinhTP)
  @UseGuards(InsertGuard)
  createTinhTP(
    @CurrentUser() user: any,
    @Args('tinhTPInput') tinhTPInput: TinhTPInput,
  ): Promise<TinhTP> {
    return this.tinhTPsService.createTinhTP(tinhTPInput, user);
  }

  @Mutation((returns) => TinhTP)
  @UseGuards(UpdateGuard)
  editTinhTP(
    @CurrentUser() user: any,
    @Args('tinhTPInput') tinhTPInput: TinhTPInput,
    @Args('id') id: number,
  ): Promise<TinhTP> {
    return this.tinhTPsService.editTinhTP(tinhTPInput, id, user);
  }

  @Mutation((returns) => TinhTP)
  @UseGuards(DeleteGuard)
  deleteTinhTP(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<TinhTP> {
    return this.tinhTPsService.deleteTinhTP(id, user);
  }

  //  ResolveField

  @ResolveField((returns) => [DeNghiTSNT])
  DeNghiTSNTs(@Parent() tinhTP: TinhTP): Promise<DeNghiTSNT[]> {
    return this.tinhTPsService.DeNghiTSNTs(tinhTP.MaTinhTP);
  }

  @ResolveField((returns) => [QuyetDinhTSNT])
  QuyetDinhTSNTs(@Parent() tinhTP: TinhTP): Promise<QuyetDinhTSNT[]> {
    return this.tinhTPsService.QuyetDinhTSNTs(tinhTP.MaTinhTP);
  }

  @ResolveField((returns) => [KetQuaTSNT])
  KetQuaTSNTs(@Parent() tinhTP: TinhTP): Promise<KetQuaTSNT[]> {
    return this.tinhTPsService.KetQuaTSNTs(tinhTP.MaTinhTP);
  }
}
