import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { CAQHvaTD } from './CAQHvaTD.model';
import { CAQHvaTDsResolver } from './CAQHvaTDs.resolver';
import { CAQHvaTDsService } from './CAQHvaTDs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CAQHvaTD, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
    DataLoaderModule,
  ],
  providers: [CAQHvaTDsResolver, CAQHvaTDsService, ActionDBsService],
})
export class CAQHvaTDsModule {}
