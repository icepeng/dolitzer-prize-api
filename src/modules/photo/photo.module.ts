import {
  MiddlewaresConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { JwtMiddleware } from '../common/jwt.middleware';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  components: [PhotoService],
  exports: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: '/photos', method: RequestMethod.ALL },
        { path: '/photos/:id', method: RequestMethod.ALL },
      );
  }
}
