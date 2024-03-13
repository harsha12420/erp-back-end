import { Module } from '@nestjs/common';
import { CustomFieldService } from './custom-field.service';
import { CustomFieldController } from './custom-field.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomField, CustomFieldSchema } from './schemas/custom-field.schema';
import { CustomFieldHandler } from './custome-field.handler';
import { CustomFieldSeeder } from './custom-field.seeder';
import { CommandModule } from 'nestjs-command';
import { SeedCommand } from './seed.command';

@Module({
  imports: [MongooseModule.forFeature([{ name: CustomField.name, schema: CustomFieldSchema }]), CommandModule],
  controllers: [CustomFieldController, CustomFieldHandler],
  providers: [CustomFieldService, CustomFieldSeeder, SeedCommand],
})
export class CustomFieldModule {}
