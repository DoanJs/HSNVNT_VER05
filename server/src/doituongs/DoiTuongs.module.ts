import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DoiTuong } from './DoiTuong.model';
import { DoiTuongsResolver } from './DoiTuongs.resolver';
import { DoiTuongsService } from './DoiTuongs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoiTuong, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [DoiTuongsResolver, DoiTuongsService, ActionDBsService],
})
export class DoiTuongsModule {}
