import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { ActionDB } from './ActionDB.model';
import { ActionDBsResolver } from './ActionDBs.resolver';
import { ActionDBsService } from './ActionDBs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [ActionDBsResolver, ActionDBsService],
})
export class ActionDBsModule {}
