import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoaiLLDB } from './LoaiLLDB.model';
import { LoaiLLDBsResolver } from './LoaiLLDBs.resolver';
import { LoaiLLDBsService } from './LoaiLLDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoaiLLDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [LoaiLLDBsResolver, LoaiLLDBsService],
})
export class LoaiLLDBsModule {}
