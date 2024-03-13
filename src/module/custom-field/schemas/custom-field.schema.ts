import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type CustomFieldDocument = HydratedDocument<CustomField>;

@Schema()
export class CustomField {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop({ default: false })
  isSearch: boolean;

  @Prop({ default: false })
  isRequired: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  formControlName: string;

  @Prop([String]) // Assuming options is an array of strings
  options: string[];

  @Prop()
  optionsType: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop({ type: SchemaTypes.ObjectId })
  field_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  reference_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  dependentOn_id: Types.ObjectId;

  @Prop({ default: true })
  isDynamic: boolean;

  @Prop({ default: false })
  isFixed: boolean;

  @Prop()
  formType: string[];
}

export const CustomFieldSchema = SchemaFactory.createForClass(CustomField);
