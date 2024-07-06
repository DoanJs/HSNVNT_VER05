import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BienBanRKN } from './BienBanRKN.model';
import { BienBanRKNsResolver } from './BienBanRKNs.resolver';
import { BienBanRKNsService } from './BienBanRKNs.service';

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
