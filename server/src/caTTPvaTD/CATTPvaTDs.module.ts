import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { CATTPvaTD } from './CATTPvaTD.model';
import { CATTPvaTDsResolver } from './CATTPvaTDs.resolver';
import { CATTPvaTDsService } from './CATTPvaTDs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CATTPvaTD, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
    DataLoaderModule,
  ],
  providers: [CATTPvaTDsResolver, CATTPvaTDsService, ActionDBsService],
})
export class CATTPvaTDsModule {}
