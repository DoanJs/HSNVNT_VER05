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
import { KetQuaXMQuanHe } from './KetQuaXMQuanHe.model';
import { KetQuaXMQuanHesService } from './KetQuaXMQuanHes.service';
import { KetQuaXMQuanHeInput } from './type/KetQuaXMQuanHe.input';

@Resolver(() => KetQuaXMQuanHe)
@UseGuards(GraphQLGuard)
export class KetQuaXMQuanHesResolver {
  constructor(private ketQuaXMQuanHesService: KetQuaXMQuanHesService) {}

  @Query((returns) => [KetQuaXMQuanHe])
  ketQuaXMQuanHes(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<KetQuaXMQuanHe[]> {
    return this.ketQuaXMQuanHesService.ketQuaXMQuanHes(utilsParams);
  }

  @Query((returns) => KetQuaXMQuanHe)
  ketQuaXMQuanHe(@Args('id') id: number): Promise<KetQuaXMQuanHe> {
    return this.ketQuaXMQuanHesService.ketQuaXMQuanHe(id);
  }

  @Mutation((returns) => KetQuaXMQuanHe)
  @UseGuards(InsertGuard)
  createKetQuaXMQuanHe(
    @CurrentUser() user: any,
    @Args('ketQuaXMQuanHeInput') ketQuaXMQuanHeInput: KetQuaXMQuanHeInput,
  ): Promise<KetQuaXMQuanHe> {
    return this.ketQuaXMQuanHesService.createKetQuaXMQuanHe(
      ketQuaXMQuanHeInput,
      user,
    );
  }

  @Mutation((returns) => KetQuaXMQuanHe)
  @UseGuards(UpdateGuard)
  editKetQuaXMQuanHe(
    @CurrentUser() user: any,
    @Args('ketQuaXMQuanHeInput') ketQuaXMQuanHeInput: KetQuaXMQuanHeInput,
    @Args('id') id: number,
  ): Promise<KetQuaXMQuanHe> {
    return this.ketQuaXMQuanHesService.editKetQuaXMQuanHe(
      ketQuaXMQuanHeInput,
      id,
      user,
    );
  }

  @Mutation((returns) => KetQuaXMQuanHe)
  @UseGuards(DeleteGuard)
  deleteKetQuaXMQuanHe(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<KetQuaXMQuanHe> {
    return this.ketQuaXMQuanHesService.deleteKetQuaXMQuanHe(id, user);
  }

  //ResolveField

  @ResolveField((returns) => BaoCaoPHQH)
  BaoCaoPHQH(@Parent() ketquaXMDiaChi: BaoCaoPHQH): Promise<BaoCaoPHQH> {
    return this.ketQuaXMQuanHesService.BaoCaoPHQH(ketquaXMDiaChi);
  }

  @ResolveField((returns) => CBCS)
  LanhDaoPD(@Parent() ketquaXMDiaChi: CBCS): Promise<CBCS> {
    return this.ketQuaXMQuanHesService.LanhDaoPD(ketquaXMDiaChi);
  }
}
