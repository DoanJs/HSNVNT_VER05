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
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { DauMoiPH_DN } from './DauMoiPH_DN.model';
import { DauMoiPH_DNsService } from './DauMoiPH_DNs.service';
import { DauMoiPH_DNInput } from './type/DauMoiPH_DN.input';

@Resolver(() => DauMoiPH_DN)
@UseGuards(GraphQLGuard)
export class DauMoiPH_DNsResolver {
  constructor(private dauMoiPH_DNsService: DauMoiPH_DNsService) {}

  @Query((returns) => [DauMoiPH_DN])
  dauMoiPH_DNs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<DauMoiPH_DN[]> {
    return this.dauMoiPH_DNsService.dauMoiPH_DNs(utilsParams);
  }

  @Query((returns) => DauMoiPH_DN)
  dauMoiPH_DN(@Args('id') id: number): Promise<DauMoiPH_DN> {
    return this.dauMoiPH_DNsService.dauMoiPH_DN(id);
  }

  @Mutation((returns) => DauMoiPH_DN)
  @UseGuards(InsertGuard)
  createDauMoiPH_DN(
    @CurrentUser() user: any,
    @Args('dauMoiPH_DNInput') dauMoiPH_DNInput: DauMoiPH_DNInput,
  ): Promise<DauMoiPH_DN> {
    return this.dauMoiPH_DNsService.createDauMoiPH_DN(dauMoiPH_DNInput, user);
  }

  @Mutation((returns) => DauMoiPH_DN)
  @UseGuards(UpdateGuard)
  editDauMoiPH_DN(
    @CurrentUser() user: any,
    @Args('dauMoiPH_DNInput') dauMoiPH_DNInput: DauMoiPH_DNInput,
    @Args('id') id: number,
  ): Promise<DauMoiPH_DN> {
    return this.dauMoiPH_DNsService.editDauMoiPH_DN(dauMoiPH_DNInput, id, user);
  }

  @Mutation((returns) => DauMoiPH_DN)
  @UseGuards(DeleteGuard)
  deleteDauMoiPH_DN(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<DauMoiPH_DN> {
    return this.dauMoiPH_DNsService.deleteDauMoiPH_DN(id, user);
  }

  //ResolveField
  @ResolveField((returns) => DeNghiTSNT)
  DeNghiTSNT(@Parent() daumoiPH_DN: DauMoiPH_DN): Promise<DeNghiTSNT> {
    return this.dauMoiPH_DNsService.DeNghiTSNT(daumoiPH_DN);
  }

  @ResolveField((returns) => CBCS)
  LDDonViDN(@Parent() daumoiPH_DN: DauMoiPH_DN): Promise<CBCS> {
    return this.dauMoiPH_DNsService.LDDonViDN(daumoiPH_DN);
  }

  @ResolveField((returns) => CBCS)
  CBTrucTiepPH(@Parent() daumoiPH_DN: DauMoiPH_DN): Promise<CBCS> {
    return this.dauMoiPH_DNsService.CBTrucTiepPH(daumoiPH_DN);
  }
}
