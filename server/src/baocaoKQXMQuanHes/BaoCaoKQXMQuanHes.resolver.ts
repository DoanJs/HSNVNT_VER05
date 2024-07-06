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
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BaoCaoKQXMQuanHe } from './BaoCaoKQXMQuanHe.model';
import { BaoCaoKQXMQuanHesService } from './BaoCaoKQXMQuanHes.service';
import { BaoCaoKQXMQuanHeInput } from './type/BaoCaoKQXMQuanHe.input';

@Resolver(() => BaoCaoKQXMQuanHe)
@UseGuards(GraphQLGuard)
export class BaoCaoKQXMQuanHesResolver {
  constructor(private baocaoKQXMQuanHesService: BaoCaoKQXMQuanHesService) {}
  @Query((returns) => [BaoCaoKQXMQuanHe])
  baocaoKQXMQuanHes(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BaoCaoKQXMQuanHe[]> {
    return this.baocaoKQXMQuanHesService.baocaoKQXMQuanHes(utilsParams);
  }

  @Query((returns) => BaoCaoKQXMQuanHe)
  baocaoKQXMQuanHe(@Args('id') id: number): Promise<BaoCaoKQXMQuanHe> {
    return this.baocaoKQXMQuanHesService.baocaoKQXMQuanHe(id);
  }

  @Mutation((returns) => BaoCaoKQXMQuanHe)
  @UseGuards(InsertGuard)
  createBaoCaoKQXMQuanHe(
    @CurrentUser() user: any,
    @Args('baocaoKQXMQuanHeInput') baocaoKQXMQuanHeInput: BaoCaoKQXMQuanHeInput,
  ): Promise<BaoCaoKQXMQuanHe> {
    return this.baocaoKQXMQuanHesService.createBaoCaoKQXMQuanHe(
      baocaoKQXMQuanHeInput,
      user,
    );
  }

  @Mutation((returns) => BaoCaoKQXMQuanHe)
  @UseGuards(UpdateGuard)
  editBaoCaoKQXMQuanHe(
    @CurrentUser() user: any,
    @Args('baocaoKQXMQuanHeInput') baocaoKQXMQuanHeInput: BaoCaoKQXMQuanHeInput,
    @Args('id') id: number,
  ): Promise<BaoCaoKQXMQuanHe> {
    return this.baocaoKQXMQuanHesService.editBaoCaoKQXMQuanHe(
      baocaoKQXMQuanHeInput,
      id,
      user,
    );
  }

  @Mutation((retursn) => BaoCaoKQXMQuanHe)
  @UseGuards(DeleteGuard)
  deleteBaoCaoKQXMQuanHe(
    @CurrentUser() user: any,
    @Args('baocaoKQXMQuanHeInput') baocaoKQXMQuanHeInput: BaoCaoKQXMQuanHeInput,
    @Args('id') id: number,
  ): Promise<BaoCaoKQXMQuanHe> {
    return this.baocaoKQXMQuanHesService.deleteBaoCaoKQXMQuanHe(
      baocaoKQXMQuanHeInput,
      id,
      user,
    );
  }

  // ResolveField

  @ResolveField((returns) => BaoCaoPHQH)
  BaoCaoPHQH(
    @Parent() baocaoKQXMQuanHe: BaoCaoKQXMQuanHe,
  ): Promise<BaoCaoPHQH> {
    return this.baocaoKQXMQuanHesService.BaoCaoPHQH(baocaoKQXMQuanHe);
  }

  @ResolveField((returns) => CBCS)
  TSXacMinh(@Parent() baocaoKQXMQuanHe: BaoCaoKQXMQuanHe): Promise<CBCS> {
    return this.baocaoKQXMQuanHesService.TSXacMinh(baocaoKQXMQuanHe);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() baocaoKQXMQuanHe: BaoCaoKQXMQuanHe): Promise<CBCS> {
    return this.baocaoKQXMQuanHesService.LanhDaoPD(baocaoKQXMQuanHe);
  }

  @ResolveField((returns) => CBCS)
  BanChiHuy(@Parent() baocaoKQXMQuanHe: BaoCaoKQXMQuanHe): Promise<CBCS> {
    return this.baocaoKQXMQuanHesService.BanChiHuy(baocaoKQXMQuanHe);
  }
}
