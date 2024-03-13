import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, SchemaTypes } from 'mongoose';

export type StepListDocument = HydratedDocument<StepList>;

@Schema()
export class StepList {
  @Prop()
  id: string;

  @Prop()
  stepName: string;

  @Prop({ type: SchemaTypes.ObjectId })
  form_id: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  sequence: number;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}
export const StepListSchema = SchemaFactory.createForClass(StepList);
