import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FormListDocument = HydratedDocument<FormList>;

@Schema()
export class FormList {
  @Prop()
  id: number;

  @Prop()
  formName: string;

  @Prop()
  formType: string;

  @Prop()
  isActive: boolean;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const FormListSchema = SchemaFactory.createForClass(FormList);
