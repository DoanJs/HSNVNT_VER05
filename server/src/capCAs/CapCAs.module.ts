import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapCA } from './CapCA.model';
import { CapCAsResolver } from './CapCAs.resolver';
import { CapCAsService } from './CapCAs.service';
import { AuthPassportModule } from 'src/authPassport/AuthPassport.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CapCA]),
    AuthPassportModule,
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [CapCAsResolver, CapCAsService],
})
export class CapCAsModule {}
