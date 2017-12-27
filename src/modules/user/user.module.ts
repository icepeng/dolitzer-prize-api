import {
  MiddlewaresConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { JwtMiddleware } from '../common/jwt.middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  components: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: '/users', method: RequestMethod.ALL },
        { path: '/users/:id/photos', method: RequestMethod.ALL },
      );
  }
}
