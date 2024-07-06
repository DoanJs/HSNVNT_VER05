import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BaoCaoKQXMQuanHe } from './BaoCaoKQXMQuanHe.model';
import { BaoCaoKQXMQuanHesResolver } from './BaoCaoKQXMQuanHes.resolver';
import { BaoCaoKQXMQuanHesService } from './BaoCaoKQXMQuanHes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaoCaoKQXMQuanHe, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [
    BaoCaoKQXMQuanHesResolver,
    BaoCaoKQXMQuanHesService,
    ActionDBsService,
  ],
})
export class BaoCaoKQXMQuanHesModule {}
