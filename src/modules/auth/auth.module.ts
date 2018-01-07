import {
  MiddlewaresConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as passport from 'passport';

import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BnetStrategy } from './passport/bnet.strategy';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User])],
  components: [BnetStrategy, JwtStrategy, AuthService],
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
