import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtStrategy } from './auth/jwt.strategy';
import { CustomFieldModule } from './module/custom-field/custom-field.module';
import { InputFieldModule } from './module/input-field/input-field.module';
import { FormListModule } from './module/form-list/form-list.module';
import { StepListModule } from './module/step-list/step-list.module';
import { ReferenceListModule } from './module/reference-list/reference-list.module';
import { GroupListModule } from './module/group-list/group-list.module';
import { FormModule } from './module/form/form.module';
import { FormValueModule } from './module/form-value/form-value.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {}),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('TOKEN_EXPIRE_IN') },
      }),
    }),
    CustomFieldModule,
    InputFieldModule,
    FormListModule,
    StepListModule,
    ReferenceListModule,
    GroupListModule,
    FormModule,
    FormValueModule,
  ],
  providers: [
    {
      provide: 'AuthProxy', // MS alias used while conecting
      useFactory: async () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.AUTH_MICROSERVICE_SERVICE_HOST, // Host of the MS you want to connect
            port: Number(process.env.AUTH_MICROSERVICE_SERVICE_PORT), // Port of the MS you want to connect
          },
        });
      },
      inject: [ConfigService],
    },
    JwtStrategy,
  ],
})
export class AppModule {}
