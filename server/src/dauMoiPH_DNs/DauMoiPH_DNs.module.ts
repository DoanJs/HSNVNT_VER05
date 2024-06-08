import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DauMoiPH_DN } from './DauMoiPH_DN.model';
import { DauMoiPH_DNsResolver } from './DauMoiPH_DNs.resolver';
import { DauMoiPH_DNsService } from './DauMoiPH_DNs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DauMoiPH_DN, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [DauMoiPH_DNsResolver, DauMoiPH_DNsService, ActionDBsService],
})
export class DauMoiPH_DNModule {}
