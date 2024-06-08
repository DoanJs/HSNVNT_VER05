import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { ChuyenAn } from './ChuyenAn.model';
import { ChuyenAnsResolver } from './ChuyenAns.resolver';
import { ChuyenAnsService } from './ChuyenAns.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChuyenAn, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [ChuyenAnsResolver, ChuyenAnsService, ActionDBsService],
})
export class ChuyenAnsModule {}
