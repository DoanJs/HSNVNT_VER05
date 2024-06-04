import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { KetQuaTSNT } from './KetQuaTSNT.model';
import { KetQuaTSNTsResolver } from './KetQuaTSNTs.resolver';
import { KetQuaTSNTsService } from './KetQuaTSNTs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([KetQuaTSNT]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [KetQuaTSNTsResolver, KetQuaTSNTsService],
})
export class KetQuaTSNTsModule {}
