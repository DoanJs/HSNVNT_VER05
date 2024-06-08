import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { CapCA } from './CapCA.model';
import { CapCAsResolver } from './CapCAs.resolver';
import { CapCAsService } from './CapCAs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CapCA, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [CapCAsResolver, CapCAsService, ActionDBsService],
})
export class CapCAsModule {}
