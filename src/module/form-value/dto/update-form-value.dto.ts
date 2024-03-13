import { PartialType } from '@nestjs/mapped-types';
import { CreateFormValueDto } from './create-form-value.dto';

export class UpdateFormValueDto extends PartialType(CreateFormValueDto) {}
