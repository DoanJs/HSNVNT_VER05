import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { DDNB } from './DDNB.model';
import { DDNBsService } from './DDNBs.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';
import { CurrentUser } from 'src/authPassport/user.decorator.graphql';

@Resolver(() => DDNB)
@UseGuards(GraphQLGuard)
export class DDNBsResolver {
  constructor(private ddnbsService: DDNBsService) {}
  @Query((returns) => [DDNB])
  ddnbs(@Args('utilsParams') utilsParams: UtilsParamsInput): Promise<DDNB[]> {
    return this.ddnbsService.ddnbs(utilsParams);
  }

  @Query((returns) => DDNB)
  ddnb(@Args('id') id: number): Promise<DDNB> {
    return this.ddnbsService.ddnb(id);
  }

  @Mutation((returns) => DDNB)
  @UseGuards(InsertGuard)
  createDDNB(
    @CurrentUser() user: any,
    @Args('ddnb') ddnb: string,
  ): Promise<DDNB> {
    return this.ddnbsService.createDDNB(ddnb, user);
  }

  @Mutation((returns) => DDNB)
  @UseGuards(UpdateGuard)
  editDDNB(
    @CurrentUser() user: any,
    @Args('ddnb') ddnb: string,
    @Args('id') id: number,
  ): Promise<DDNB> {
    return this.ddnbsService.editDDNB(ddnb, id, user);
  }

  @Mutation((returns) => DDNB)
  @UseGuards(DeleteGuard)
  deleteDDNB(@CurrentUser() user: any, @Args('id') id: number): Promise<DDNB> {
    return this.ddnbsService.deleteDDNB(id, user);
  }

  //ResolveField

  @ResolveField((returns) => [KetQuaTSNT])
  KetQuaTSNTs(@Parent() ddnb: DDNB): Promise<KetQuaTSNT[]> {
    return this.ddnbsService.KetQuaTSNTs(ddnb.MaDDNB);
  }
}
