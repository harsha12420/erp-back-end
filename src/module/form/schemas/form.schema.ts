import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type FormDocument = HydratedDocument<Form>;

@Schema()
export class Form {
  @Prop()
  id: string;

  @Prop({ default: 0 })
  school_id: number;

  @Prop()
  form_id: Types.ObjectId;

  @Prop({ default: false })
  isMultiple: boolean;

  @Prop([
    {
      _id: {
        type: Types.ObjectId,
        default: () => new Types.ObjectId().toHexString(),
        unique: true,
      },
      field_id: Types.ObjectId,
      isRequired: Boolean,
      fieldName: String,
      formControlName: String,
      name: String,
      isFixed: Boolean,
      reference_id: Types.ObjectId,
      dependentOn_id: Types.ObjectId,
      isListView: Boolean,
      options: [],
      optionsType: String,
      sequence: Number,
      isSearch: Boolean,
    },
  ])
  fields_array: {
    field_id: Types.ObjectId;
    isRequired: boolean;
    fieldName: string;
    formControlName: string;
    name: string;
    isFixed: boolean;
    reference_id: Types.ObjectId;
    dependentOn_id: Types.ObjectId;
    isListView: boolean;
    options: string[];
    optionsType: string;
    sequence: number;
    isSearch: boolean;
  }[];

  @Prop()
  step_id: Types.ObjectId;

  @Prop()
  group_id: Types.ObjectId;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const FormSchema = SchemaFactory.createForClass(Form);
