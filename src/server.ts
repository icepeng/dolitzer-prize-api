import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import * as fs from 'fs';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as cors from 'cors';

async function bootstrap() {
  try {
    const httpsOptions = {
      key: fs.readFileSync('./secrets/key.pem'),
      cert: fs.readFileSync('./secrets/cert.pem'),
    };

    const server = express();
    const app = await NestFactory.create(ApplicationModule, server);
    await app.init();
    await app.use(cors());

    http.createServer(server).listen(3000);
    https.createServer(httpsOptions, server).listen(443);
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
