import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BaoCaoKQXMDiaChi } from './BaoCaoKQXMDiaChi.model';
import { BaoCaoKQXMDiaChisResolver } from './BaoCaoKQXMDiaChis.resolver';
import BaoCaoKQXMDiaChisService from './BaoCaoKQXMDiaChis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaoCaoKQXMDiaChi, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [
    BaoCaoKQXMDiaChisResolver,
    BaoCaoKQXMDiaChisService,
    ActionDBsService,
  ],
})
export class BaoCaoKQXMDiaChisModule {}
