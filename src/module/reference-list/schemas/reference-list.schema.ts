import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReferenceListDocument = HydratedDocument<ReferenceList>;

@Schema()
export class ReferenceList {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  isActive: boolean;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}
export const ReferenceListSchema = SchemaFactory.createForClass(ReferenceList);
