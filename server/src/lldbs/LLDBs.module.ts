import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LLDB } from './LLDB.model';
import { LLDBsResolver } from './LLDBs.resolver';
import { LLDBsService } from './LLDBs.service';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DataLoaderModule,
    TypeOrmModule.forFeature([LLDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [LLDBsResolver, LLDBsService],
})
export class LLDBsModule {}
