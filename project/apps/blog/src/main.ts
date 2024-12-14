import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Default } from '@project/shared-types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog service API')
    .setDescription('Posts and comments routes and resources')
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix(Default.GlobalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Default.SpecificationPrefix, app, document);

  const port = process.env.PORT || Default.DefaultPort;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${Default.GlobalPrefix}`);
}

bootstrap();
