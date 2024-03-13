import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InputFieldDocument = HydratedDocument<InputField>;

@Schema()
export class InputField {
  @Prop()
  id: number;

  @Prop()
  fieldName: string;

  @Prop()
  isActive: boolean;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const InputFieldSchema = SchemaFactory.createForClass(InputField);
