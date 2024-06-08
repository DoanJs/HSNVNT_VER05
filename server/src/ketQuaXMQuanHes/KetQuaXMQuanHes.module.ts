import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { KetQuaXMQuanHe } from './KetQuaXMQuanHe.model';
import { KetQuaXMQuanHesResolver } from './KetQuaXMQuanHes.resolver';
import { KetQuaXMQuanHesService } from './KetQuaXMQuanHes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([KetQuaXMQuanHe, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [
    KetQuaXMQuanHesResolver,
    KetQuaXMQuanHesService,
    ActionDBsService,
  ],
})
export class KetQuaXMQuanHesModule {}
