import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionDB } from 'src/actionDBs/ActionDB.model';
import { ActionDBsService } from 'src/actionDBs/ActionDBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BienPhapDT } from './BienPhapDT.model';
import { BienPhapDTsResolver } from './BienPhapDTs.resolver';
import { BienPhapDTsService } from './BienPhapDTs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BienPhapDT, ActionDB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BienPhapDTsResolver, BienPhapDTsService, ActionDBsService],
})
export class BienPhapDTsModule {}
