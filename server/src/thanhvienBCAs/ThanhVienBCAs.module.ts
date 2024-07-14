import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { ThanhVienBCA } from './ThanhVienBCA.model';
import { ThanhVienBCAsResolver } from './ThanhVienBCAs.resolver';
import { ThanhVienBCAsService } from './ThanhVienBCAs.service';

@Module({
  imports: [
    DataLoaderModule,
    TypeOrmModule.forFeature([ThanhVienBCA, ActionDB]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [ThanhVienBCAsResolver, ThanhVienBCAsService, ActionDBsService],
})
export class ThanhVienBCAsModule {}
