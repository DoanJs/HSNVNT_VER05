import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DanToc } from './DanToc.model';
import { DanTocsResolver } from './DanTocs.resolver';
import { DanTocsService } from './DanTocs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([DanToc, CBCS]),
    AuthPassportModule,
    DataLoaderModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [DanTocsResolver, DanTocsService],
})
export class DanTocsModule {}
