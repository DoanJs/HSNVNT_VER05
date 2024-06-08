import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { KetQuaTSNT } from './KetQuaTSNT.model';
import { KetQuaTSNTsResolver } from './KetQuaTSNTs.resolver';
import { KetQuaTSNTsService } from './KetQuaTSNTs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([KetQuaTSNT, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [KetQuaTSNTsResolver, KetQuaTSNTsService, ActionDBsService],
})
export class KetQuaTSNTsModule {}
