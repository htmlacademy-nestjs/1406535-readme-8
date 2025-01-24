import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Default } from '@project/shared-types';
import { RequestIdInterceptor } from '@project/shared-interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(Default.GlobalPrefix);
  app.useGlobalInterceptors(new RequestIdInterceptor());

  const port = process.env.PORT || Default.DefaultPort;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${Default.GlobalPrefix}`);
}

bootstrap();
