import { Component } from '@nestjs/common';
import * as passport from 'passport';
import { Strategy } from 'passport-bnet';

const Secret = require('../../../../secrets/secret');

@Component()
export class BnetStrategy extends Strategy {
  constructor() {
    super(
      {
        clientID: 'jkwah5ej8huy3es57s22c3zgx8y9z3vd',
        clientSecret: Secret.clientSecret,
        callbackURL: 'https://localhost:3001/api/v1/auth/bnet/callback',
        region: 'kr',
      },
      async (accessToken, refreshToken, profile, done) =>
        await this.verify(accessToken, refreshToken, profile, done),
    );
    passport.use(this);
  }

  public async verify(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
}
