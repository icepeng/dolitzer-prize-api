import * as OAuth2 from 'passport-oauth2';

declare module 'passport-bnet' {
  class Strategy extends OAuth2.Strategy {
    name: 'bnet';
    constructor(options: StrategyOptions, verify: OAuth2.VerifyFunction);
  }
}

interface StrategyOptions {
  clientID: string;
  clientSecret: string;
  scope?: string;
  callbackURL: string;
  region?: string;
}
