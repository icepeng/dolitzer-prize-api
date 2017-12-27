import { Component } from '@nestjs/common';
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Secret } from '../../../../secrets/secret';
import { AuthService } from '../auth.service';

@Component()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: Secret.jwtSecret,
      },
      async (req, payload, next) => await this.verify(req, payload, next),
    );
    passport.use(this);
  }

  public async verify(req, payload, done) {
    const existingUser = await this.authService.validateUser(payload);
    if (!existingUser) {
      return done('Unauthorized', false);
    }
    done(null, existingUser);
  }
}
