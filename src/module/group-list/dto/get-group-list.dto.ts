import { Types } from 'mongoose';

export class GetGroupListDto {
  readonly form_id: Types.ObjectId;
  readonly step_id: Types.ObjectId;
}
