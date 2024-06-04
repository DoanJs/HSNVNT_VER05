import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BaoCaoKQXMDiaChi } from './BaoCaoKQXMDiaChi.model';
import { BaoCaoKQXMDiaChisResolver } from './BaoCaoKQXMDiaChis.resolver';
import BaoCaoKQXMDiaChisService from './BaoCaoKQXMDiaChis.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaoCaoKQXMDiaChi]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BaoCaoKQXMDiaChisResolver, BaoCaoKQXMDiaChisService],
})
export class BaoCaoKQXMDiaChisModule {}
