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
import { ChuyenAn } from 'src/chuyenans/ChuyenAn.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { ThanhVienBCA } from './ThanhVienBCA.model';
import { ThanhVienBCAsService } from './ThanhVienBCAs.service';
import { ThanhVienBCAInput } from './type/ThanhVienBCA.input';

@Resolver(() => ThanhVienBCA)
@UseGuards(GraphQLGuard)
export class ThanhVienBCAsResolver {
  constructor(private thanhvienBCAsService: ThanhVienBCAsService) {}
  @Query((returns) => [ThanhVienBCA])
  thanhvienBCAs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<ThanhVienBCA[]> {
    return this.thanhvienBCAsService.thanhvienBCAs(utilsParams);
  }

  @Query((returns) => ThanhVienBCA)
  thanhvienBCA(@Args('id') id: number): Promise<ThanhVienBCA> {
    return this.thanhvienBCAsService.thanhvienBCA(id);
  }

  @Mutation((returns) => ThanhVienBCA)
  @UseGuards(InsertGuard)
  createThanhVienBCA(
    @CurrentUser() user: any,
    @Args('thanhvienBCAInput') thanhvienBCAInput: ThanhVienBCAInput,
  ): Promise<ThanhVienBCA> {
    return this.thanhvienBCAsService.createThanhVienBCA(
      thanhvienBCAInput,
      user,
    );
  }

  @Mutation((returns) => ThanhVienBCA)
  @UseGuards(UpdateGuard)
  editThanhVienBCA(
    @CurrentUser() user: any,
    @Args('thanhvienBCAInput') thanhvienBCAInput: ThanhVienBCAInput,
    @Args('id') id: number,
  ): Promise<ThanhVienBCA> {
    return this.thanhvienBCAsService.editThanhVienBCA(
      thanhvienBCAInput,
      id,
      user,
    );
  }

  @Mutation((returns) => ThanhVienBCA)
  @UseGuards(DeleteGuard)
  deleteThanhVienBCA(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<ThanhVienBCA> {
    return this.thanhvienBCAsService.deleteThanhVienBCA(id, user);
  }

  // ResolveField

  @ResolveField((returns) => ChuyenAn)
  ChuyenAn(@Parent() thanhvienBCA: ThanhVienBCA): Promise<ChuyenAn> {
    return this.thanhvienBCAsService.ChuyenAn(thanhvienBCA);
  }

  @ResolveField((returns) => CBCS)
  CBCS(@Parent() thanhvienBCA: ThanhVienBCA): Promise<CBCS> {
    return this.thanhvienBCAsService.CBCS(thanhvienBCA);
  }
}
