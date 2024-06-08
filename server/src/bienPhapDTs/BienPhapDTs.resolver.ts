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
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BienPhapDT } from './BienPhapDT.model';
import { BienPhapDTsService } from './BienPhapDTs.service';

@Resolver(() => BienPhapDT)
@UseGuards(GraphQLGuard)
export class BienPhapDTsResolver {
  constructor(private bienPhapDTsService: BienPhapDTsService) {}

  @Query((returns) => [BienPhapDT])
  bienPhapDTs(
    @Args('utilsParams') utilsParams: UtilsParamsInput,
  ): Promise<BienPhapDT[]> {
    return this.bienPhapDTsService.bienPhapDTs(utilsParams);
  }

  @Query((returns) => BienPhapDT)
  bienPhapDT(@Args('id') id: number): Promise<BienPhapDT> {
    return this.bienPhapDTsService.bienPhapDT(id);
  }

  @Mutation((returns) => BienPhapDT)
  @UseGuards(InsertGuard)
  createBienPhapDT(
    @CurrentUser() user: any,
    @Args('bienPhapDT') bienPhapDT: string,
  ): Promise<BienPhapDT> {
    return this.bienPhapDTsService.createBienPhapDT(bienPhapDT, user);
  }

  @Mutation((returns) => BienPhapDT)
  @UseGuards(UpdateGuard)
  editBienPhapDT(
    @CurrentUser() user: any,
    @Args('bienPhapDT') bienPhapDT: string,
    @Args('id') id: number,
  ): Promise<BienPhapDT> {
    return this.bienPhapDTsService.editBienPhapDT(bienPhapDT, id, user);
  }

  @Mutation((returns) => BienPhapDT)
  @UseGuards(DeleteGuard)
  deleteBienPhapDT(
    @CurrentUser() user: any,
    @Args('id') id: number,
  ): Promise<BienPhapDT> {
    return this.bienPhapDTsService.deleteBienPhapDT(id, user);
  }

  //ResolveField
  @ResolveField(() => [DoiTuong])
  DoiTuongs(@Parent() bienPhapDT: BienPhapDT): Promise<DoiTuong[]> {
    return this.bienPhapDTsService.DoiTuongs(bienPhapDT.MaBPDT);
  }
}
