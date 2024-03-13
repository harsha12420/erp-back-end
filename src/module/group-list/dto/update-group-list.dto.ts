import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupListDto } from './create-group-list.dto';

export class UpdateGroupListDto extends PartialType(CreateGroupListDto) {}
