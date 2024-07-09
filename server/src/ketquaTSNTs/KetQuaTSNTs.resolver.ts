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
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BaoCaoKTDN } from 'src/baocaoKTDNs/BaoCaoKTDN.model';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import { BaoCaoPHPT } from 'src/baocaoPHPTs/BaoCaoPHPT.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { BienBanRKN } from 'src/bienbanRKNs/BienBanRKN.model';
import { DanhGiaTSTH } from 'src/danhgiaTSTHs/DanhGiaTSTH.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { TinhTP } from 'src/tinhTPs/TinhTP.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { KetQuaTSNT } from './KetQuaTSNT.model';
import { KetQuaTSNTsService } from './KetQuaTSNTs.service';
import { KetQuaTSNTInput } from './type/KetQuaTSNT.input';
import { KetQuaTSNT_TinhTPType } from './type/KetQuaTSNT_TinhTP.type';
import { KetQuaTSNT_TinhTPInput } from './type/KetQuaTSNT_TinhTP.input';

@Resolver(() => KetQuaTSNT)
@UseGuards(GraphQLGuard)
export class KetQuaTSNTsResolver {
  constructor(private ketquaTSNTsService: KetQuaTSNTsService) {}
  @Query((returns) => [KetQuaTSNT])
  ketquaTSNTs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<KetQuaTSNT[]> {
    return this.ketquaTSNTsService.ketquaTSNTs(utilsParams);
  }

  @Query((returns) => KetQuaTSNT)
  ketquaTSNT(@Args('id') id: number): Promise<KetQuaTSNT> {
    return this.ketquaTSNTsService.ketquaTSNT(id);
  }

  @Mutation((returns) => KetQuaTSNT)
  @UseGuards(InsertGuard)
  createKetQuaTSNT(
    @CurrentUser() user: any,
    @Args('ketquaTSNTInput') ketquaTSNTInput: KetQuaTSNTInput,
  ): Promise<KetQuaTSNT> {
    return this.ketquaTSNTsService.createKetQuaTSNT(ketquaTSNTInput, user);
  }

  @Mutation((returns) => KetQuaTSNT)
  @UseGuards(UpdateGuard)
  editKetQuaTSNT(
    @CurrentUser() user: any,
    @Args('id') id: number,
    @Args('ketquaTSNTInput') ketquaTSNTInput: KetQuaTSNTInput,
  ): Promise<KetQuaTSNT> {
    return this.ketquaTSNTsService.editKetQuaTSNT(ketquaTSNTInput, id, user);
  }

  @Mutation((returns) => KetQuaTSNT)
  @UseGuards(DeleteGuard)
  deleteKetQuaTSNT(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<KetQuaTSNT> {
    return this.ketquaTSNTsService.deleteKetQuaTSNT(id, user);
  }

  // many-to-many relation

  @Query((returns) => [KetQuaTSNT_TinhTPType])
  ketquaTSNTs_tinhTPs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<KetQuaTSNT_TinhTPType[]> {
    return this.ketquaTSNTsService.ketquaTSNTs_tinhTPs(utilsParams);
  }

  @Mutation((returns) => KetQuaTSNT_TinhTPType)
  @UseGuards(InsertGuard)
  createKetQuaTSNT_TinhTP(
    @CurrentUser() user: any,
    @Args('ketquaTSNT_tinhtpInput')
    ketquaTSNT_tinhtpInput: KetQuaTSNT_TinhTPInput,
  ): Promise<KetQuaTSNT_TinhTPType> {
    return this.ketquaTSNTsService.createKetQuaTSNT_TinhTP(
      ketquaTSNT_tinhtpInput,
      user,
    );
  }

  @Mutation((returns) => KetQuaTSNT_TinhTPType)
  @UseGuards(UpdateGuard)
  editKetQuaTSNT_TinhTP(
    @CurrentUser() user: any,
    @Args('ketquaTSNT_tinhtpInput')
    ketquaTSNT_tinhtpInput: KetQuaTSNT_TinhTPInput,
    @Args('MaTinhTP') MaTinhTP: number,
    @Args('MaKQ') MaKQ: number,
  ): Promise<KetQuaTSNT_TinhTPType> {
    return this.ketquaTSNTsService.editKetQuaTSNT_TinhTP(
      ketquaTSNT_tinhtpInput,
      MaTinhTP,
      MaKQ,
      user,
    );
  }

  @Mutation((retursn) => KetQuaTSNT_TinhTPType)
  @UseGuards(DeleteGuard)
  deleteKetQuaTSNT_TinhTP(
    @CurrentUser() user: any,
    @Args('MaTinhTP') MaTinhTP: number,
    @Args('MaKQ') MaKQ: number,
  ): Promise<KetQuaTSNT_TinhTPType> {
    return this.ketquaTSNTsService.deleteKetQuaTSNT_TinhTP(
      MaTinhTP,
      MaKQ,
      user,
    );
  }

  // ResolveField

  @ResolveField((returns) => KeHoachTSNT)
  KeHoachTSNT(@Parent() ketquaTSNT: KetQuaTSNT): Promise<KeHoachTSNT> {
    return this.ketquaTSNTsService.KeHoachTSNT(ketquaTSNT);
  }

  @ResolveField((returns) => [TinhTP])
  PhamViTSs(@Parent() ketquaTSNT: KetQuaTSNT): Promise<TinhTP[]> {
    return this.ketquaTSNTsService.PhamViTSs(ketquaTSNT.MaKQ);
  }

  @ResolveField((returns) => [BaoCaoPHDC])
  BaoCaoPHDCs(@Parent() ketquaTSNT: KetQuaTSNT): Promise<BaoCaoPHDC[]> {
    return this.ketquaTSNTsService.BaoCaoPHDCs(ketquaTSNT.MaKQ);
  }

  @ResolveField((returns) => [BaoCaoKQGH])
  BaoCaoKQGHs(@Parent() ketquaTSNT: KetQuaTSNT): Promise<BaoCaoKQGH[]> {
    return this.ketquaTSNTsService.BaoCaoKQGHs(ketquaTSNT.MaKQ);
  }

  @ResolveField((returns) => BienBanRKN)
  BienBanRKN(@Parent() ketquaTSNT: KetQuaTSNT): Promise<BienBanRKN> {
    return this.ketquaTSNTsService.BienBanRKN(ketquaTSNT.MaKQ);
  }

  @ResolveField((returns) => [BaoCaoPHQH])
  BaoCaoPHQHs(@Parent() ketquaTSNT: KetQuaTSNT): Promise<BaoCaoPHQH[]> {
    return this.ketquaTSNTsService.BaoCaoPHQHs(ketquaTSNT.MaKQ);
  }

  @ResolveField((returns) => [BaoCaoPHPT])
  BaoCaoPHPTs(@Parent() ketquaTSNT: KetQuaTSNT): Promise<BaoCaoPHPT[]> {
    return this.ketquaTSNTsService.BaoCaoPHPTs(ketquaTSNT.MaKQ);
  }

  @ResolveField((returns) => BaoCaoKTDN)
  BaoCaoKTDN(@Parent() ketquaTSNT: KetQuaTSNT): Promise<BaoCaoKTDN> {
    return this.ketquaTSNTsService.BaoCaoKTDN(ketquaTSNT.MaKQ);
  }

  @ResolveField((returns) => [DanhGiaTSTH])
  DanhGiaTSTHs(@Parent() ketquaTSNT: KetQuaTSNT): Promise<DanhGiaTSTH[]> {
    return this.ketquaTSNTsService.DanhGiaTSTHs(ketquaTSNT.MaKQ);
  }
}
