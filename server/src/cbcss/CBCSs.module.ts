import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { CBCS } from './CBCS.model';
import { CBCSsResolver } from './CBCSs.resolver';
import { CBCSsService } from './CBCSs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CBCS]),
    DataLoaderModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [CBCSsResolver, CBCSsService],
})
export class CBCSsModule {}
