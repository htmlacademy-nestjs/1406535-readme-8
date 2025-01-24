import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Default } from '@project/shared-types';
import { RequestIdInterceptor } from '@project/shared-interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Service API')
  .setDescription('Blog application routes and resources')
  .setVersion('1.0')
  .build();

  app.setGlobalPrefix(Default.GlobalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Default.SpecificationPrefix, app, document);

  app.useGlobalInterceptors(new RequestIdInterceptor());

  const port = 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${Default.GlobalPrefix}`);
}

bootstrap();
