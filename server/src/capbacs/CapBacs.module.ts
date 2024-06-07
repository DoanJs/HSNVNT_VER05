import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { CapBac } from './CapBac.model';
import { CapBacsResolver } from './CapBacs.resolver';
import { CapBacsService } from './CapBacs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CapBac, ActionDB]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
    AuthPassportModule,
  ],
  providers: [CapBacsResolver, CapBacsService, ActionDBsService],
})
export class CapBacsModule {}
