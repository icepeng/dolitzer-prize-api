import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { Auth } from '../common/auth.decorator';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Profile } from './interfaces/profile';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('bnet')
  public async authorized() {
    console.log('Authorized route...');
  }

  @Get('bnet/callback')
  public async callback(@Auth() profile: Profile, @Res() res: Response) {
    const user = await this.userService.saveUser(profile);
    const token = await this.authService.createToken(user);
    return res.render('authenticated', { token });
  }
}
