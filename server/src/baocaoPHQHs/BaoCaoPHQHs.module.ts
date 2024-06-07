import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BaoCaoPHQH } from './BaoCaoPHQH.model';
import { BaoCaoPHQHsResolver } from './BaoCaoPHQHs.resolver';
import { BaoCaoPHQHsService } from './BaoCaoPHQHs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaoCaoPHQH, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BaoCaoPHQHsResolver, BaoCaoPHQHsService, ActionDBsService],
})
export class BaoCaoPHQHsModule {}
