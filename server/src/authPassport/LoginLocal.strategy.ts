import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthPassportService } from './AuthPassport.service';

@Injectable()
export class LoginLocalStrategy extends PassportStrategy(
  Strategy,
  'login.local',
) {
  constructor(private authPassportService: AuthPassportService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const account = await this.authPassportService.validateLogin(
      username,
      password,
    );
    if (!account) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }
    return account;
  }
}
