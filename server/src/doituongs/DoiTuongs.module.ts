import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DoiTuong } from './DoiTuong.model';
import { DoiTuongsResolver } from './DoiTuongs.resolver';
import { DoiTuongsService } from './DoiTuongs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoiTuong]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [DoiTuongsResolver, DoiTuongsService],
})
export class DoiTuongsModule {}
