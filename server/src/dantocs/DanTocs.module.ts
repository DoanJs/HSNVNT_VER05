import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DanToc } from './DanToc.model';
import { DanTocsResolver } from './DanTocs.resolver';
import { DanTocsService } from './DanTocs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DanToc, ActionDB]),
    AuthPassportModule,
    DataLoaderModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [DanTocsResolver, DanTocsService, ActionDBsService],
})
export class DanTocsModule {}
