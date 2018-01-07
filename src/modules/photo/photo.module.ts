import {
  MiddlewaresConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtMiddleware } from '../common/jwt.middleware';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
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
