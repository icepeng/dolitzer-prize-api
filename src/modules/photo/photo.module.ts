import {
  MiddlewaresConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as passport from 'passport';

import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  components: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(
        { path: '/photo', method: RequestMethod.ALL },
      );
  }
}
