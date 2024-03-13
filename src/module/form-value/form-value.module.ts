import { Module } from '@nestjs/common';
import { FormValueService } from './form-value.service';
import { FormValueController } from './form-value.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormValue, FormValueSchema } from './schemas/form-value.schema';
import { FilesService } from 'src/shared/file.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FormValue.name,
        schema: FormValueSchema,
      },
    ]),
  ],
  controllers: [FormValueController],
  providers: [FormValueService, ConfigService, FilesService],
})
export class FormValueModule {}
