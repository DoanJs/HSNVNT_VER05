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
import { CBCS } from 'src/cbcss/CBCS.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BaoCaoKTDN } from './BaoCaoKTDN.model';
import { BaoCaoKTDNsService } from './BaoCaoKTDNs.service';
import { BaoCaoKTDNInput } from './type/BaoCaoKTDN.input';

@Resolver(() => BaoCaoKTDN)
@UseGuards(GraphQLGuard)
export class BaoCaoKTDNsResolver {
  constructor(private baocaoKTDNsService: BaoCaoKTDNsService) {}

  @Query((returns) => [BaoCaoKTDN])
  baoCaoKTDNs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoKTDN[]> {
    return this.baocaoKTDNsService.baoCaoKTDNs(utilsParams);
  }

  @Query((returns) => BaoCaoKTDN)
  baoCaoKTDN(@Args('id') id: number): Promise<BaoCaoKTDN> {
    return this.baocaoKTDNsService.baoCaoKTDN(id);
  }

  @Mutation((returns) => BaoCaoKTDN)
  @UseGuards(InsertGuard)
  createBaoCaoKTDN(
    @CurrentUser() user: any,
    @Args('baocaoKTDNInput') baocaoKTDNInput: BaoCaoKTDNInput,
  ): Promise<BaoCaoKTDN> {
    return this.baocaoKTDNsService.createBaoCaoKTDN(baocaoKTDNInput, user);
  }

  @Mutation((returns) => BaoCaoKTDN)
  @UseGuards(UpdateGuard)
  editBaoCaoKTDN(
    @CurrentUser() user: any,
    @Args('baocaoKTDNInput') baocaoKTDNInput: BaoCaoKTDNInput,
    @Args('id') id: number,
  ): Promise<BaoCaoKTDN> {
    return this.baocaoKTDNsService.editBaoCaoKTDN(baocaoKTDNInput, id, user);
  }

  @Mutation((returns) => BaoCaoKTDN)
  @UseGuards(DeleteGuard)
  deleteBaoCaoKTDN(
    @CurrentUser() user: any,
    @Args('baocaoKTDNInput') baocaoKTDNInput: BaoCaoKTDNInput,
    @Args('id') id: number,
  ): Promise<BaoCaoKTDN> {
    return this.baocaoKTDNsService.deleteBaoCaoKTDN(baocaoKTDNInput, id, user);
  }

  //ResolveField
  @ResolveField((returns) => KetQuaTSNT)
  KetQuaTSNT(@Parent() baocaoKTDN: BaoCaoKTDN): Promise<KetQuaTSNT> {
    return this.baocaoKTDNsService.KetQuaTSNT(baocaoKTDN);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() baocaoKTDN: BaoCaoKTDN): Promise<CBCS> {
    return this.baocaoKTDNsService.LanhDaoPD(baocaoKTDN);
  }

  @ResolveField((returns) => CBCS)
  CBTongHop(@Parent() baocaoKTDN: BaoCaoKTDN): Promise<CBCS> {
    return this.baocaoKTDNsService.CBTongHop(baocaoKTDN);
  }
}
