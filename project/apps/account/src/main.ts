import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Default } from '@project/shared-types';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Account service API')
    .setDescription('Users and authentification routes and resources')
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
