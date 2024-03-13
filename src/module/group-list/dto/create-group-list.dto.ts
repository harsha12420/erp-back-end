import { ObjectId } from 'mongoose';

export class CreateGroupListDto {
  readonly groupName: string;
  readonly form_id: ObjectId;
  readonly step_id: ObjectId;
  readonly isActive: boolean;
}
