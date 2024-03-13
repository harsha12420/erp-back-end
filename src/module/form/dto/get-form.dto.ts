import { Types } from 'mongoose';

export class GetFormDto {
  readonly form_id: Types.ObjectId;
  readonly step_id: Types.ObjectId;
  readonly group_id: Types.ObjectId;
  readonly isListView: boolean;
}
