import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

import { ApplicationModule } from './modules/app.module';

async function bootstrap() {
  try {
    const httpsOptions = {
      key: fs.readFileSync('./secrets/key.pem'),
      cert: fs.readFileSync('./secrets/cert.pem'),
    };

    const server = express();
    const app = await NestFactory.create(ApplicationModule, server);
    app.use(cors());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    http.createServer(server).listen(3000);
    https.createServer(httpsOptions, server).listen(3001);
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
