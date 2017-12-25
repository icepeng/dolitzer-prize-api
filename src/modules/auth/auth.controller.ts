import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('bnet')
  public async authorized() {
    console.log('Authorized route...');
  }

  @Get('bnet/callback')
  public async callback(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    return res.redirect(`localhost:4200/auth?battletag=${req.user.battletag}&token=${req.user.token}`);
  }
}
