import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomFieldSeeder } from './module/custom-field/custom-field.seeder';
import { ReferenceFieldSeeder } from './module/reference-list/reference-field.seeder';

async function bootstrap() {
  const logger = new Logger('MainService');
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const seeder = app.get(CustomFieldSeeder);
  const referenceSeeder = app.get(ReferenceFieldSeeder);

  await seeder.seed();
  await referenceSeeder.seed();
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      retryAttempts: process.env.MICROSERVICE_RETRY,
      retryDelay: process.env.MICROSERVICE_RETRYDELAY,
      host: process.env.CUSTOMFIELD_MICROSERVICE_SERVICE_HOST,
      port: process.env.CUSTOMFIELD_MICROSERVICE_SERVICE_PORT,
    },
  });
  app.setGlobalPrefix('api/customfield-service');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      disableErrorMessages: false,
      stopAtFirstError: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Accept-Version',
  });
  app.use(helmet());
  const options = new DocumentBuilder()
    .setTitle('Customfield microservices')
    .setDescription('Customfield related APIs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        in: 'header',
        name: 'jwt',
        description: 'JWT token validation',
      },
      'bearer',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api/customfield-service/doc', app, document);
  app.startAllMicroservices().then(() => {
    logger.log(`Microservice listing on port ${process.env.CUSTOMFIELD_MICROSERVICE_SERVICE_PORT}`);
  });
  app.listen(process.env.CUSTOMFIELD_SERVICE_PORT).then(() => {
    logger.log(`Listing on port ${process.env.CUSTOMFIELD_SERVICE_PORT}`);
  });
}
bootstrap();
