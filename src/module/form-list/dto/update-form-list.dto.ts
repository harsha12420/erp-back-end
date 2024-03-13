import { PartialType } from '@nestjs/mapped-types';
import { CreateFormListDto } from './create-form-list.dto';

export class UpdateFormListDto extends PartialType(CreateFormListDto) {}
