import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { KeHoachTSNT } from './KeHoachTSNT.model';
import { KeHoachTSNTsResolver } from './KeHoachTSNTs.resolver';
import { KeHoachTSNTsService } from './KeHoachTSNTs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([KeHoachTSNT]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [KeHoachTSNTsResolver, KeHoachTSNTsService],
})
export class KeHoachTSNTsModule {}
