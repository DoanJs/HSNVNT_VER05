import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { KyDuyet_DN } from './KyDuyet_DN.model';
import { KyDuyet_DNsResolver } from './KyDuyet_DNs.resolver';
import { KyDuyet_DNsService } from './KyDuyet_DNs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([KyDuyet_DN, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [KyDuyet_DNsResolver, KyDuyet_DNsService, ActionDBsService],
})
export class KyDuyet_DNsModule {}
