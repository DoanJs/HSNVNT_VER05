import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BaoCaoKQGH } from './BaoCaoKQGH.model';
import { BaoCaoKQGHsResolver } from './BaoCaoKQGHs.resolver';
import { BaoCaoKQGHsService } from './BaoCaoKQGHs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { ActionDB } from 'src/actionDBs/ActionDB.model';

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
