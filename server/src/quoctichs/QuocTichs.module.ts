import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { QuocTich } from './QuocTich.model';
import { QuocTichsResolver } from './QuocTichs.resolver';
import { QuocTichsService } from './QuocTichs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuocTich, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [QuocTichsResolver, QuocTichsService, ActionDBsService],
})
export class QuocTichsModule {}
