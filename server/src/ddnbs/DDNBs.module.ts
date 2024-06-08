import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DDNB } from './DDNB.model';
import { DDNBsResolver } from './DDNBs.resolver';
import { DDNBsService } from './DDNBs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DDNB, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [DDNBsResolver, DDNBsService, ActionDBsService],
})
export class DDNBsModule {}
