import { PartialType } from '@nestjs/mapped-types';
import { CreateInputFieldDto } from './create-input-field.dto';

export class UpdateInputFieldDto extends PartialType(CreateInputFieldDto) {}
