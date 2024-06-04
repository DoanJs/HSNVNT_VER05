import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { KetQuaXMDiaChi } from './KetQuaXMDiaChi.model';
import { KetQuaXMDiaChisResolver } from './KetQuaXMDiaChis.resolver';
import { KetQuaXMDiaChisService } from './KetQuaXMDiaChis.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([KetQuaXMDiaChi]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [KetQuaXMDiaChisResolver, KetQuaXMDiaChisService],
})
export class KetQuaXMDiaChisModule {}
