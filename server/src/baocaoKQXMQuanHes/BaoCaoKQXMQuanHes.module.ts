import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from 'src/dataloader/Dataloader.module';
import { BaoCaoKQXMQuanHe } from './BaoCaoKQXMQuanHe.model';
import { BaoCaoKQXMQuanHesResolver } from './BaoCaoKQXMQuanHes.resolver';
import { BaoCaoKQXMQuanHesService } from './BaoCaoKQXMQuanHes.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaoCaoKQXMQuanHe]),
    DataLoaderModule,
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [BaoCaoKQXMQuanHesResolver, BaoCaoKQXMQuanHesService],
})
export class BaoCaoKQXMQuanHesModule {}
