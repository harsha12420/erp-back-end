import { Module } from '@nestjs/common';
import { FormListService } from './form-list.service';
import { FormListController } from './form-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormList, FormListSchema } from './schemas/form-list.schema';
import { FormListHandler } from './form-list.handler';

@Module({
  imports: [MongooseModule.forFeature([{ name: FormList.name, schema: FormListSchema }])],
  controllers: [FormListController, FormListHandler],
  providers: [FormListService],
})
export class FormListModule {}
