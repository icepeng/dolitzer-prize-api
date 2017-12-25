import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  modules: [AuthModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
