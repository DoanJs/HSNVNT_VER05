import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { TramCT } from './TramCT.model';
import { TramCTsResolver } from './TramCTs.resolver';
import { TramCTsService } from './TramCTs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TramCT, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [TramCTsResolver, TramCTsService, ActionDBsService],
})
export class TramCTsModule {}
