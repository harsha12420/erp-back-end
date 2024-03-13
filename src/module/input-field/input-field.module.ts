import { Module } from '@nestjs/common';
import { InputFieldService } from './input-field.service';
import { InputFieldController } from './input-field.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InputField, InputFieldSchema } from './schemas/input-field.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InputField.name, schema: InputFieldSchema },
    ]),
  ],
  controllers: [InputFieldController],
  providers: [InputFieldService],
})
export class InputFieldModule {}
