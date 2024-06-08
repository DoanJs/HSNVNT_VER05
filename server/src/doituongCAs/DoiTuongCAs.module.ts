import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DoiTuongCA } from './DoiTuongCA.model';
import { DoiTuongCAsResolver } from './DoiTuongCAs.resolver';
import { DoiTuongCAsService } from './DoiTuongCAs.service';

@Module({
  imports: [
    DataLoaderModule,
    TypeOrmModule.forFeature([DoiTuongCA, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [DoiTuongCAsResolver, DoiTuongCAsService, ActionDBsService],
})
export class DoiTuongCAsModule {}
