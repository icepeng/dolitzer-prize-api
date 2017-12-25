import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import { BnetStrategy } from './passport/bnet.strategy';
import { AuthController } from './auth.controller';

@Module({
  components: [BnetStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('bnet', { session: false }))
      .forRoutes(
        { path: '/auth/bnet', method: RequestMethod.ALL },
        { path: '/auth/bnet/callback', method: RequestMethod.ALL },
      );
  }
}
