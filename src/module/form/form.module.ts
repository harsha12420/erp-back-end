import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from './schemas/form.schema';
import { CustomField, CustomFieldSchema } from '../custom-field/schemas/custom-field.schema';
import { FormList, FormListSchema } from '../form-list/schemas/form-list.schema';
import { StepList, StepListSchema } from '../step-list/schemas/step-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Form.name,
        schema: FormSchema,
      },
    ]),
    MongooseModule.forFeature([{ name: CustomField.name, schema: CustomFieldSchema }]),
    MongooseModule.forFeature([{ name: FormList.name, schema: FormListSchema }]),
    MongooseModule.forFeature([{ name: StepList.name, schema: StepListSchema }]),
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
