import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DanhGiaTSTH } from './DanhGiaTSTH.model';
import { DanhGiaTSTHsResolver } from './DanhGiaTSTHs.resolver';
import { DanhGiaTSTHsService } from './DanhGiaTSTHs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([DanhGiaTSTH]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
    DataLoaderModule,
  ],
  providers: [DanhGiaTSTHsResolver, DanhGiaTSTHsService],
})
export class DanhGiaTSTHsModule {}
