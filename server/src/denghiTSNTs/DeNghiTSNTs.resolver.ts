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
import { DauMoiPH_DN } from 'src/dauMoiPH_DNs/DauMoiPH_DN.model';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { HinhThucHD } from 'src/hinhthucHDs/HinhThucHD.model';
import { KyDuyet_DN } from 'src/kyDuyet_DNs/KyDuyet_DN.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TinhTP } from 'src/tinhTPs/TinhTP.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { DeNghiTSNT } from './DeNghiTSNT.model';
import { DeNghiTSNTsService } from './DeNghiTSNTs.service';
import { DeNghiTSNTInput } from './type/DeNghiTSNT.input';
import { DeNghiTSNT_TinhTPInput } from './type/DeNghiTSNT_TinhTP.input';
import { DeNghiTSNT_TinhTPType } from './type/DeNghiTSNT_TinhTP.type';

@Resolver(() => DeNghiTSNT)
@UseGuards(GraphQLGuard)
export class DeNghiTSNTsResolver {
  constructor(private denghiTSNTsService: DeNghiTSNTsService) {}
  @Query((returns) => [DeNghiTSNT])
  denghiTSNTs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<DeNghiTSNT[]> {
    return this.denghiTSNTsService.denghiTSNTs(utilsParams);
  }

  @Query((returns) => DeNghiTSNT)
  denghiTSNT(@Args('id') id: number): Promise<DeNghiTSNT> {
    return this.denghiTSNTsService.denghiTSNT(id);
  }

  @Mutation((returns) => DeNghiTSNT)
  @UseGuards(InsertGuard)
  createDeNghiTSNT(
    @CurrentUser() user: any,
    @Args('denghiTSNTInput') denghiTSNTInput: DeNghiTSNTInput,
  ): Promise<DeNghiTSNT> {
    return this.denghiTSNTsService.createDeNghiTSNT(denghiTSNTInput, user);
  }

  @Mutation((returns) => DeNghiTSNT)
  @UseGuards(UpdateGuard)
  editDeNghiTSNT(
    @CurrentUser() user: any,
    @Args('id') id: number,
    @Args('denghiTSNTInput') denghiTSNTInput: DeNghiTSNTInput,
  ): Promise<DeNghiTSNT> {
    return this.denghiTSNTsService.editDeNghiTSNT(id, denghiTSNTInput, user);
  }

  @Mutation((returns) => DeNghiTSNT)
  @UseGuards(DeleteGuard)
  deleteDeNghiTSNT(
    @CurrentUser() user: any,
    @Args('id') id: number,
    @Args('denghiTSNTInput') denghiTSNTInput: DeNghiTSNTInput,
  ): Promise<DeNghiTSNT> {
    return this.denghiTSNTsService.deleteDeNghiTSNT(id, denghiTSNTInput, user);
  }

  // many-to-many relation

  @Query((returns) => [DeNghiTSNT_TinhTPType])
  denghiTSNTs_tinhTPs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<DeNghiTSNT_TinhTPType[]> {
    return this.denghiTSNTsService.denghiTSNTs_tinhTPs(utilsParams);
  }

  @Mutation((returns) => DeNghiTSNT_TinhTPType)
  @UseGuards(InsertGuard)
  createDeNghiTSNT_TinhTP(
    @CurrentUser() user: any,
    @Args('denghitsnt_tinhtpInput')
    denghitsnt_tinhtpInput: DeNghiTSNT_TinhTPInput,
  ): Promise<DeNghiTSNT_TinhTPType> {
    return this.denghiTSNTsService.createDeNghiTSNT_TinhTP(
      denghitsnt_tinhtpInput,
      user,
    );
  }

  @Mutation((returns) => DeNghiTSNT_TinhTPType)
  @UseGuards(UpdateGuard)
  editDeNghiTSNT_TinhTP(
    @CurrentUser() user: any,
    @Args('denghitsnt_tinhtpInput')
    denghitsnt_tinhtpInput: DeNghiTSNT_TinhTPInput,
    @Args('MaTinhTP') MaTinhTP: number,
    @Args('MaDN') MaDN: number,
  ): Promise<DeNghiTSNT_TinhTPType> {
    return this.denghiTSNTsService.editDeNghiTSNT_TinhTP(
      denghitsnt_tinhtpInput,
      MaTinhTP,
      MaDN,
      user,
    );
  }

  @Mutation((retursn) => DeNghiTSNT_TinhTPType)
  @UseGuards(DeleteGuard)
  deleteDeNghiTSNT_TinhTP(
    @CurrentUser() user: any,
    @Args('MaTinhTP') MaTinhTP: number,
    @Args('MaDN') MaDN: number,
  ): Promise<DeNghiTSNT_TinhTPType> {
    return this.denghiTSNTsService.deleteDeNghiTSNT_TinhTP(
      MaTinhTP,
      MaDN,
      user,
    );
  }

  // ResolveField

  @ResolveField((returns) => CAQHvaTD)
  CAQHvaTD(@Parent() denghiTSNT: DeNghiTSNT): Promise<CAQHvaTD> {
    return this.denghiTSNTsService.CAQHvaTD(denghiTSNT);
  }

  @ResolveField((returns) => DoiTuong)
  DoiTuong(@Parent() denghiTSNT: DeNghiTSNT): Promise<DoiTuong> {
    return this.denghiTSNTsService.DoiTuong(denghiTSNT);
  }

  @ResolveField((returns) => HinhThucHD)
  HinhThucHD(@Parent() denghiTSNT: DeNghiTSNT): Promise<HinhThucHD> {
    return this.denghiTSNTsService.HinhThucHD(denghiTSNT);
  }

  @ResolveField((returns) => [TinhTP])
  DiaBanDNs(@Parent() denghiTSNT: DeNghiTSNT): Promise<TinhTP[]> {
    return this.denghiTSNTsService.DiaBanDNs(denghiTSNT.MaDN);
  }

  @ResolveField((returns) => DauMoiPH_DN)
  DauMoiPH_DN(@Parent() denghiTSNT: DeNghiTSNT): Promise<DauMoiPH_DN> {
    return this.denghiTSNTsService.DauMoiPH_DN(denghiTSNT.MaDN);
  }

  @ResolveField((returns) => KyDuyet_DN)
  KyDuyet_DN(@Parent() denghiTSNT: DeNghiTSNT): Promise<KyDuyet_DN> {
    return this.denghiTSNTsService.KyDuyet_DN(denghiTSNT.MaDN);
  }

  @ResolveField((returns) => QuyetDinhTSNT)
  QuyetDinhTSNT(@Parent() denghiTSNT: DeNghiTSNT): Promise<QuyetDinhTSNT> {
    return this.denghiTSNTsService.QuyetDinhTSNT(denghiTSNT.MaDN);
  }
}
