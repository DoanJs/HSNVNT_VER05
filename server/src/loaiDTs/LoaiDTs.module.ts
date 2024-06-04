import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoaiDT } from './LoaiDT.model';
import { LoaiDTsResolver } from './LoaiDTs.resolver';
import { LoaiDTsService } from './LoaiDTs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoaiDT]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [LoaiDTsResolver, LoaiDTsService],
})
export class LoaiDTsModule {}
