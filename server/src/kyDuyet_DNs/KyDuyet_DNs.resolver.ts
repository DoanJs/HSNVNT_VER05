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
import { KyDuyet_DN } from './KyDuyet_DN.model';
import { KyDuyet_DNsService } from './KyDuyet_DNs.service';
import { KyDuyet_DNInput } from './type/KyDuyet_DN.Input';

@Resolver(() => KyDuyet_DN)
@UseGuards(GraphQLGuard)
export class KyDuyet_DNsResolver {
  constructor(private kyDuyet_DNsService: KyDuyet_DNsService) {}

  @Query((returns) => [KyDuyet_DN])
  kyDuyet_DNs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<KyDuyet_DN[]> {
    return this.kyDuyet_DNsService.kyDuyet_DNs(utilsParams);
  }

  @Query((returns) => KyDuyet_DN)
  kyDuyet_DN(@Args('id') id: number): Promise<KyDuyet_DN> {
    return this.kyDuyet_DNsService.kyDuyet_DN(id);
  }

  @Mutation((returns) => KyDuyet_DN)
  @UseGuards(InsertGuard)
  createKyDuyet_DN(
    @CurrentUser() user: any,
    @Args('kyDuyet_DNInput') kyDuyet_DNInput: KyDuyet_DNInput,
  ): Promise<KyDuyet_DN> {
    return this.kyDuyet_DNsService.createKyDuyet_DN(kyDuyet_DNInput, user);
  }

  @Mutation((returns) => KyDuyet_DN)
  @UseGuards(UpdateGuard)
  editKyDuyet_DN(
    @CurrentUser() user: any,
    @Args('kyDuyet_DNInput') kyDuyet_DNInput: KyDuyet_DNInput,
    @Args('id') id: number,
  ): Promise<KyDuyet_DN> {
    return this.kyDuyet_DNsService.editKyDuyet_DN(kyDuyet_DNInput, id, user);
  }

  @Mutation((returns) => KyDuyet_DN)
  @UseGuards(DeleteGuard)
  deleteKyDuyet_DN(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<KyDuyet_DN> {
    return this.kyDuyet_DNsService.deleteKyDuyet_DN(id, user);
  }

  //ResolveField

  @ResolveField((returns) => DeNghiTSNT)
  DeNghiTSNT(@Parent() kyduyet_DNInput: KyDuyet_DNInput): Promise<DeNghiTSNT> {
    return this.kyDuyet_DNsService.DeNghiTSNT(kyduyet_DNInput);
  }
  @ResolveField((returns) => CBCS)
  DaiDienCATTPvaTD(@Parent() kyduyet_DNInput: KyDuyet_DNInput): Promise<CBCS> {
    return this.kyDuyet_DNsService.DaiDienCATTPvaTD(kyduyet_DNInput);
  }
  @ResolveField((returns) => CBCS)
  DaiDienDonViDN(@Parent() kyduyet_DNInput: KyDuyet_DNInput): Promise<CBCS> {
    return this.kyDuyet_DNsService.DaiDienDonViDN(kyduyet_DNInput);
  }
  @ResolveField((returns) => CBCS)
  DaiDienDonViTSNT(@Parent() kyduyet_DNInput: KyDuyet_DNInput): Promise<CBCS> {
    return this.kyDuyet_DNsService.DaiDienDonViTSNT(kyduyet_DNInput);
  }
}
