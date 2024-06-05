import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriesResolver } from './Histories.resolver';
import { HistoriesService } from './Histories.service';
import { History } from './History.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';

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
