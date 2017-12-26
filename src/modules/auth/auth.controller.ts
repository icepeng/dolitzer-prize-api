import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

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
  public async callback(@Req() req: Request, @Res() res: Response) {
    const profile: Profile = req.user;
    const user = await this.userService.saveUser(profile);
    const token = await this.authService.createToken(user);
    return res.redirect(`localhost:4200/auth?token=${token}`);
  }
}
