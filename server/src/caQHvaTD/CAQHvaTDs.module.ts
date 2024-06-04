import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { CAQHvaTD } from './CAQHvaTD.model';
import { CAQHvaTDsResolver } from './CAQHvaTDs.resolver';
import { CAQHvaTDsService } from './CAQHvaTDs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CAQHvaTD]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
    DataLoaderModule,
  ],
  providers: [CAQHvaTDsResolver, CAQHvaTDsService],
})
export class CAQHvaTDsModule {}
