import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import BaoCaoPHPT from './BaoCaoPHPT.model';
import { BaoCaoPHPTsResolver } from './BaoCaoPHPTs.resolver';
import { BaoCaoPHPTsService } from './BaoCaoPHPTs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaoCaoPHPT, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BaoCaoPHPTsResolver, BaoCaoPHPTsService, ActionDBsService],
})
export class BaoCaoPHPTsModule {}
