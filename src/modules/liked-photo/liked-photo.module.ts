import {
  MiddlewaresConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { JwtMiddleware } from '../common/jwt.middleware';
import { PhotoModule } from '../photo/photo.module';
import { LikedPhotoController } from './liked-photo.controller';
import { LikedPhotoService } from './liked-photo.service';

@Module({
  imports: [PhotoModule],
  components: [LikedPhotoService],
  controllers: [LikedPhotoController],
})
export class LikedPhotoModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: '/users/:userId/photos', method: RequestMethod.ALL },
        { path: '/users/:userId/liked-photos', method: RequestMethod.ALL },
        { path: '/users/:userId/liked-photos/:id', method: RequestMethod.ALL },
      );
  }
}
