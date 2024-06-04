import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DDNB } from './DDNB.model';
import { DDNBsResolver } from './DDNBs.resolver';
import { DDNBsService } from './DDNBs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([DDNB]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [DDNBsResolver, DDNBsService],
})
export class DDNBsModule {}
