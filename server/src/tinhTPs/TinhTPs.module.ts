import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { TinhTP } from './TinhTP.model';
import { TinhTPsResolver } from './TinhTPs.resolver';
import { TinhTPsService } from './TinhTPs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TinhTP, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [TinhTPsResolver, TinhTPsService, ActionDBsService],
})
export class TinhTPsModule {}
