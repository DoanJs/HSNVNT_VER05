import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { HistoriesResolver } from './Histories.resolver';
import { HistoriesService } from './Histories.service';
import { History } from './History.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [HistoriesResolver, HistoriesService],
})
export class HistoriesModule {}
