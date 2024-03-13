import { Types } from 'mongoose';

export class CreateStepListDto {
  readonly stepName: string;
  readonly form_id: Types.ObjectId;
  readonly isActive: boolean;
}
