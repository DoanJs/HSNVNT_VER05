import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CATTPvaTD } from './CATTPvaTD.model';
import { CATTPvaTDsResolver } from './CATTPvaTDs.resolver';
import { CATTPvaTDsService } from './CATTPvaTDs.service';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CATTPvaTD]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
    DataLoaderModule,
  ],
  providers: [CATTPvaTDsResolver, CATTPvaTDsService],
})
export class CATTPvaTDsModule {}
