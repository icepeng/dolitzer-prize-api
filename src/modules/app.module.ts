import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { LikedPhotoModule } from './liked-photo/liked-photo.module';
import { Photo } from './photo/photo.entity';
import { PhotoModule } from './photo/photo.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  modules: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pinkbean',
      database: 'dolitzer',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PhotoModule,
    LikedPhotoModule,
  ],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
