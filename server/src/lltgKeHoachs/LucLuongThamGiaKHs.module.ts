import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { LucLuongThamGiaKH } from './LucLuongThamGiaKH.model';
import { LucLuongThamGiaKHsResolver } from './LucLuongThamGiaKHs.resolver';
import { LucLuongThamGiaKHsService } from './LucLuongThamGiaKHs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([LucLuongThamGiaKH]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [LucLuongThamGiaKHsResolver, LucLuongThamGiaKHsService],
})
export class LucLuongThamGiaKHsModule {}
