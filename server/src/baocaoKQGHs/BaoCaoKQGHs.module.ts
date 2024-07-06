import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BaoCaoKQGH } from './BaoCaoKQGH.model';
import { BaoCaoKQGHsResolver } from './BaoCaoKQGHs.resolver';
import { BaoCaoKQGHsService } from './BaoCaoKQGHs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaoCaoKQGH, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BaoCaoKQGHsResolver, BaoCaoKQGHsService, ActionDBsService],
})
export class BaoCaoKQGHsModule {}
