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
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { HinhThucHD } from './HinhThucHD.model';
import { HinhThucHDsService } from './HinhThucHDs.service';

@Resolver(() => HinhThucHD)
@UseGuards(GraphQLGuard)
export class HinhThucHDsResolver {
  constructor(private hinhthucHDsService: HinhThucHDsService) {}

  @Query((returns) => [HinhThucHD])
  hinhthucHDs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<HinhThucHD[]> {
    return this.hinhthucHDsService.hinhthucHDs(utilsParams);
  }

  @Query((returns) => HinhThucHD)
  hinhthucHD(@Args('id') id: number): Promise<HinhThucHD> {
    return this.hinhthucHDsService.hinhthucHD(id);
  }

  @Mutation((returs) => HinhThucHD)
  @UseGuards(InsertGuard)
  createHinhThucHD(
    @CurrentUser() user: any,
    @Args('hinhthuc') hinhthuc: string,
  ): Promise<HinhThucHD> {
    return this.hinhthucHDsService.createHinhThucHD(hinhthuc, user);
  }

  @Mutation((returns) => HinhThucHD)
  @UseGuards(UpdateGuard)
  editHinhThucHD(
    @CurrentUser() user: any,
    @Args('hinhthuc') hinhthuc: string,
    @Args('id') id: number,
  ): Promise<HinhThucHD> {
    return this.hinhthucHDsService.editHinhThucHD(hinhthuc, id, user);
  }

  @Mutation((returns) => HinhThucHD)
  @UseGuards(DeleteGuard)
  deleteHinhThucHD(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<HinhThucHD> {
    return this.hinhthucHDsService.deleteHinhThucHD(id, user);
  }

  // ResolveField

  @ResolveField((returns) => [DeNghiTSNT])
  DeNghiTSNTs(@Parent() hinhthucHD: HinhThucHD): Promise<DeNghiTSNT[]> {
    return this.hinhthucHDsService.DeNghiTSNTs(hinhthucHD.MaHTHD);
  }
}
