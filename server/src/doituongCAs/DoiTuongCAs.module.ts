import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { DoiTuongCA } from './DoiTuongCA.model';
import { DoiTuongCAsResolver } from './DoiTuongCAs.resolver';
import { DoiTuongCAsService } from './DoiTuongCAs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DataLoaderModule,
    TypeOrmModule.forFeature([DoiTuongCA]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [DoiTuongCAsResolver, DoiTuongCAsService],
})
export class DoiTuongCAsModule {}
