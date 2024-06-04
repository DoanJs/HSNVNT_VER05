import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuocTich } from './QuocTich.model';
import { QuocTichsResolver } from './QuocTichs.resolver';
import { QuocTichsService } from './QuocTichs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuocTich]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [QuocTichsResolver, QuocTichsService],
})
export class QuocTichsModule {}
