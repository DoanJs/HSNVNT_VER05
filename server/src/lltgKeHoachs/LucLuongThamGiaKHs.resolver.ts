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
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { LucLuongThamGiaKH } from './LucLuongThamGiaKH.model';
import { LucLuongThamGiaKHsService } from './LucLuongThamGiaKHs.service';
import { LucLuongThamGiaKHInput } from './type/LucLuongThamGiaKH.input';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { UseGuards } from '@nestjs/common';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';

@Resolver(() => LucLuongThamGiaKH)
@UseGuards(GraphQLGuard)
export class LucLuongThamGiaKHsResolver {
  constructor(private lucluongthamgiaKHsService: LucLuongThamGiaKHsService) {}
  @Query((returns) => [LucLuongThamGiaKH])
  lucluongThamGiaKHs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<LucLuongThamGiaKH[]> {
    return this.lucluongthamgiaKHsService.lucluongThamGiaKHs(utilsParams);
  }

  @Query((returns) => LucLuongThamGiaKH)
  lucluongThamGiaKH(@Args('id') id: number): Promise<LucLuongThamGiaKH> {
    return this.lucluongthamgiaKHsService.lucluongThamGiaKH(id);
  }

  @Mutation((returs) => LucLuongThamGiaKH)
  @UseGuards(InsertGuard)
  createLucLuongThamGiaKH(
    @CurrentUser() user: any,
    @Args('lucluongThamGiaKHInput')
    lucluongThamGiaKHInput: LucLuongThamGiaKHInput,
  ): Promise<LucLuongThamGiaKH> {
    return this.lucluongthamgiaKHsService.createLucLuongThamGiaKH(
      lucluongThamGiaKHInput,
      user,
    );
  }

  @Mutation((returns) => LucLuongThamGiaKH)
  @UseGuards(UpdateGuard)
  editLucLuongThamGiaKH(
    @CurrentUser() user: any,
    @Args('lucluongThamGiaKHInput')
    lucluongThamGiaKHInput: LucLuongThamGiaKHInput,
    @Args('id') id: number,
  ): Promise<LucLuongThamGiaKH> {
    return this.lucluongthamgiaKHsService.editLucLuongThamGiaKH(
      lucluongThamGiaKHInput,
      id,
      user,
    );
  }

  @Mutation((returns) => LucLuongThamGiaKH)
  @UseGuards(DeleteGuard)
  deleteLucLuongThamGiaKH(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<LucLuongThamGiaKH> {
    return this.lucluongthamgiaKHsService.deleteLucLuongThamGiaKH(id, user);
  }

  // ResolveField

  @ResolveField((returns) => KeHoachTSNT)
  KeHoachTSNT(
    @Parent() lucluongThamGiaKH: LucLuongThamGiaKH,
  ): Promise<KeHoachTSNT> {
    return this.lucluongthamgiaKHsService.KeHoachTSNT(lucluongThamGiaKH);
  }

  @ResolveField((returns) => CBCS)
  CBCS(@Parent() lucluongThamGiaKH: LucLuongThamGiaKH): Promise<CBCS> {
    return this.lucluongthamgiaKHsService.CBCS(lucluongThamGiaKH);
  }
}
