import { PartialType } from '@nestjs/mapped-types';
import { CreateStepListDto } from './create-step-list.dto';

export class UpdateStepListDto extends PartialType(CreateStepListDto) {}
