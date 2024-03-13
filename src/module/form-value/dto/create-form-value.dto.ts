import { Types } from 'mongoose';

export class CreateFormValueDto {
  readonly fieldValueArray: {
    field_array_id: Types.ObjectId;
    fieldValue: string;
  }[];
  readonly form_id: Types.ObjectId;
  readonly step_id: Types.ObjectId;
  readonly logo: string;
}
