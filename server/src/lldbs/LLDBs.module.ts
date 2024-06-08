import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { LLDB } from './LLDB.model';
import { LLDBsResolver } from './LLDBs.resolver';
import { LLDBsService } from './LLDBs.service';

@Module({
  imports: [
    DataLoaderModule,
    TypeOrmModule.forFeature([LLDB, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [LLDBsResolver, LLDBsService, ActionDBsService],
})
export class LLDBsModule {}
