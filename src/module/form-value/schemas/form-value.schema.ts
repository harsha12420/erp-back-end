import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type FormValueDocument = HydratedDocument<FormValue>;

@Schema()
export class FormValue {
  @Prop()
  id: string;

  @Prop()
  form_id: Types.ObjectId;

  @Prop()
  step_id: Types.ObjectId;

  @Prop()
  fieldValueArray: {
    field_array_id: Types.ObjectId;
    fieldValue: string;
  }[];

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop()
  logo: string;
}

export const FormValueSchema = SchemaFactory.createForClass(FormValue);
