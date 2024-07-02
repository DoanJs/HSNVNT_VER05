import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BienBanRKN } from './BienBanRKN.model';
import { BienBanRKNsResolver } from './BienBanRKNs.resolver';
import { BienBanRKNsService } from './BienBanRKNs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BienBanRKN, ActionDB]),
    AuthPassportModule,
    DataLoaderModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BienBanRKNsResolver, BienBanRKNsService, ActionDBsService],
})
export class BienBanRKNsModule {}
