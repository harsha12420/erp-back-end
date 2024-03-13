import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, SchemaTypes } from 'mongoose';

export type GroupListDocument = HydratedDocument<GroupList>;

@Schema()
export class GroupList {
  @Prop()
  id: string;

  @Prop()
  groupName: string;

  @Prop({ type: SchemaTypes.ObjectId })
  form_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  step_id: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}
export const GroupListSchema = SchemaFactory.createForClass(GroupList);
