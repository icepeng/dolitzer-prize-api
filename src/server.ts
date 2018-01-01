import { NestFactory } from '@nestjs/core';
import * as consolidate from 'consolidate';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';

import { ApplicationModule } from './modules/app.module';
import { ParseModelPipe } from './modules/common/parse-model.pipe';

async function bootstrap() {
  try {
    const httpsOptions = {
      key: fs.readFileSync('./secrets/key.pem'),
      cert: fs.readFileSync('./secrets/cert.pem'),
    };

    const server = express();
    const app = await NestFactory.create(ApplicationModule, server);
    app.set('views', path.join(__dirname, '../view'));
    server.engine('html', consolidate.mustache);
    app.set('view engine', 'html');
    app.use(cors());
    app.setGlobalPrefix('/api/v1');
    app.useGlobalPipes(new ParseModelPipe());
    await app.init();

    http.createServer(server).listen(3000);
    https.createServer(httpsOptions, server).listen(3001);
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
