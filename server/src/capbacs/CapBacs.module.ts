import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapBac } from './CapBac.model';
import { CapBacsResolver } from './CapBacs.resolver';
import { CapBacsService } from './CapBacs.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CapBac]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
    AuthPassportModule,
  ],
  providers: [CapBacsResolver, CapBacsService],
})
export class CapBacsModule {}
