import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BienPhapDT } from './BienPhapDT.model';
import { BienPhapDTsResolver } from './BienPhapDTs.resolver';
import { BienPhapDTsService } from './BienPhapDTs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([BienPhapDT]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BienPhapDTsResolver, BienPhapDTsService],
})
export class BienPhapDTsModule {}
