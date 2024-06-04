import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { TinhTP } from './TinhTP.model';
import { TinhTPsResolver } from './TinhTPs.resolver';
import { TinhTPsService } from './TinhTPs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([TinhTP]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [TinhTPsResolver, TinhTPsService],
})
export class TinhTPsModule {}
