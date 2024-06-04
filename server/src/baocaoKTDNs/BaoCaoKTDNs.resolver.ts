import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UtilsParamsInput } from 'src/utils/type/UtilsParams.input';
import { BaoCaoKTDN } from './BaoCaoKTDN.model';
import { BaoCaoKTDNsService } from './BaoCaoKTDNs.service';
import { BaoCaoKTDNInput } from './type/BaoCaoKTDN.input';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/authPassport/GraphQL.Guard';
import { InsertGuard } from 'src/authPassport/authorization/insert.guard';
import { UpdateGuard } from 'src/authPassport/authorization/update.guard';
import { DeleteGuard } from 'src/authPassport/authorization/delete.guard';

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
    @Args('baocaoKTDNInput') baocaoKTDNInput: BaoCaoKTDNInput,
  ): Promise<BaoCaoKTDN> {
    return this.baocaoKTDNsService.createBaoCaoKTDN(baocaoKTDNInput);
  }

  @Mutation((returns) => BaoCaoKTDN)
  @UseGuards(UpdateGuard)
  editBaoCaoKTDN(
    @Args('baocaoKTDNInput') baocaoKTDNInput: BaoCaoKTDNInput,
    @Args('id') id: number,
  ): Promise<BaoCaoKTDN> {
    return this.baocaoKTDNsService.editBaoCaoKTDN(baocaoKTDNInput, id);
  }

  @Mutation((returns) => BaoCaoKTDN)
  @UseGuards(DeleteGuard)
  deleteBaoCaoKTDN(
    @Args('baocaoKTDNInput') baocaoKTDNInput: BaoCaoKTDNInput,
    @Args('id') id: number,
  ): Promise<BaoCaoKTDN> {
    return this.baocaoKTDNsService.deleteBaoCaoKTDN(baocaoKTDNInput, id);
  }

  //ResolveField
}
